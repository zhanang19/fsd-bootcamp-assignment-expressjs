const { user: UserModel } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  await UserModel.create({
    name,
    email,
    password: passwordHash,
  })
    .then((user) => {
      if (!user) {
        return res.status(500).send({
          message: "Failed to register user",
          data: null,
        });
      }

      return res.status(201).send({
        message: "User successfully registered",
        data: null,
      });
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  await UserModel.findOne({
    attributes: ["id", "name", "email", "password"],
    where: { email },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(401).send({
          message: "Invalid email / password",
          data: null,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({
          message: "Invalid email / password",
          data: null,
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      return res.send({
        message: "User successfully logged in",
        data: { token },
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { register, login };
