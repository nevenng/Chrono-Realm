/* eslint-disable no-useless-catch */
const express = require("express");
const { getUserByUsername, createUser, getUser, updateUserRole, validatePasskey,
 getUserById, getAllUsers, checkUserRole, getOrdersByUser, getUserActiveCart
} = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


// POST /api/users/register



router.use((req, res, next) => {
    console.log("A request has been made to /users");

    next();
})


router.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
  
      if (_user) {
        return res.status(409).json({
          error: "UserExistError",
          message: `User ${username} is already taken.`,
        });
      }
  
      if (password.length < 8) {
        return res.status(400).json({
          error: "PasswordTooShort",
          message: "Password too short!",
        });
      }
  
      const user = await createUser({
        username,
        password,
      });
  
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
  
      return res.json({
        message: "You have successfully registered!",
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  });
  

// POST /api/users/login

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
      status: 400,
    });
  }

  try {
    const user = await getUser({ username, password });

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role
        },
        process.env.JWT_SECRET
      );

      return res.json({
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        },
        message: "You're logged in!",
        token,
      });
    } else {
      return next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
        status: 401,
      });
    }
  } catch (error) {
    next(error);
  }
});

//GET /api/users/all (needs Admin role)



router.get("/all", async (req, res, next) => {
  try {
      const user = req.user;
      console.log(user);

      if (!checkUserRole(user)) {
        return res.status(401).json({ message: 'You must be an admin to access this' });
      }

    const users = await getAllUsers();

    res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


  //GET /api/users:userId/orders
  router.get('/:userId/orders', async (req, res, next) => {
    const header = req.headers.authorization;
    const userId = req.params.userId; 
    
    try {
      if (!header) {
        res.status(401);
        res.send({
          error: 'Token is missing',
          message: 'You must be logged in to perform this action',
          name: 'NoTokenError',
        });
      } else {
        const token = header.split(' ')[1];
  
        const orders = await getOrdersByUser(userId);
        const response = {
          orders: orders,
        };
        res.send(response);

      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
  

  //PATCH /api/users/roles/update to change role to admin

  router.patch("/roles/update", async (req, res, next) => {
    
    const { userId ,passkey } = req.body;
  
    try {

      const isValidPasskey = await validatePasskey(passkey);
  
      if (!isValidPasskey) {
        return res.status(401).json({ message: "Invalid passkey" });
      }
  
      const existingUser = await getUserById(userId);
  
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const updatedUser = await updateUserRole(userId, 'admin');
  
      res.json({ message: "User role updated to 'admin'", user: updatedUser });
    } catch (error) {
      next(error);
    }
  });
  


module.exports = router;
