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
            res.send({
                error: "UserExistError",
                message: `User ${username} is already taken.`,
                name: "This user already exists."
            });
        }

        if (password.length < 8) {
            res.send({
                error: "PasswordTooShort",
                message: "Password Too Short!",
                name: "Password does not meet length requirement"
            });
        }

        const user = await createUser({
            username,
            password
        });

        const token = jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {
            expiresIn: "1w"
        });

        res.send({
            message: "You Successfully Registered!",
            user,
            token,
        });
    }
    catch ({ name, message }) {
        next({ name, message })
    }
});

// POST /api/users/login

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }

    try {
        const user = await getUser({ username, password });

        const token = await jwt.sign(user, process.env.JWT_SECRET);
        if (user) {
            res.send({
                user: {
                    id: user.id,
                    username: user.username
                },
                message: "you're logged in!",
                token: token
            });
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect"
            })
        }
    }
    catch ({ name, message }) {
        ({ name, message });
    }
});



module.exports = router;
