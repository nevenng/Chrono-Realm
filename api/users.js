/* eslint-disable no-useless-catch */
const express = require("express");
const { getUserByUsername, createUser, getUser} = require("../db");
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
          },
          process.env.JWT_SECRET
        );
  
        return res.json({
          user: {
            id: user.id,
            username: user.username,
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
  


module.exports = router;
