const express = require("express");
const usersRouter = express.Router();
const { createUser, getAllUsers, getUserByUsername } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.status(200).send({
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    const error = {
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    };
    console.log(error);
    res.status(206).send({ error });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
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

      res.status(200).send({
        message: "you're logged in!",
        token,
      });
    } else {
      const error = {
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      };
      console.log(error);
      res.send({ error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      res.status(409).send({
        name: "UserExistsError",
        message: "A user by that username already exists",
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

    res.status(200).send({
      message: "thank you for signing up",
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// calling an async function after the create user function to hash and encrypt the password
async function hashedPassword(password) {
  try {
    // assigning saltValue to an await function to then generate the salt value
    const saltValue = await bcrypt.genSalt(8);
    console.log(`I am the salt value: ${saltValue}`);
    // now we are hashing our salt value by passing password and saltValue as a promise
    const hashedValue = await bcrypt.hash(password, saltValue);
    console.log(`I am the hashed value: `, hashedValue);
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
}
// callling the hashedPassword function to show in our terminal/console
hashedPassword("password");

module.exports = usersRouter;
