import {User} from "../models/user.js";
import Joi from "joi";

import pkg from "bcryptjs";
const {compare} = pkg;

export const login = async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send("Invalid email or password.");

  if (!user.password) return res.status(400).send("Invalid email or password.");

  const validPassword = await compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res
    .cookie("jwt_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    })
    .send({
      message: "Login successful",
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
};

export const logout = (req, res) => {
  res
    .clearCookie("jwt_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .send("Logged out");
};

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.object(schema).validate(req.body);
}

export const googleCallBack = (req, res) => {
  // Success: send a token or redirect to frontend
  const token = req.user.generateAuthToken();
  // Set the cookie
  res
    .cookie("jwt_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000, // 1 hour
    })
    .redirect(`${process.env.FRONTEND_URL}/profile`);
};
