const { isStrongPassword } = require("validator");
const { user: UserModel } = require("../models");
const { isValidEmail } = require("../utils/validator");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateRegister = async (req, res, next) => {
  console.log("1m");
  const { name, email, password } = req.body;
  console.log("2m");

  if (!name || !email || !password) {
    return res.status(400).send({
      message: "Name, email, and password are required",
      data: null,
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
      data: null,
    });
  }

  if (
    !isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
  ) {
    return res.status(400).send({
      message: "Password is too weak",
      data: null,
    });
  }

  const emailCheck = await UserModel.findOne({
    where: { email },
  });
  if (emailCheck) {
    return res.status(400).send({
      message: "Email already registered",
      data: null,
    });
  }

  next();
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password are required",
      data: null,
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
      data: null,
    });
  }

  next();
};

module.exports = { validateRegister, validateLogin };
