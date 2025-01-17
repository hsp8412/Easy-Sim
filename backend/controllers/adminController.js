import pkg from "bcryptjs";
const {hash, genSalt} = pkg;

import _ from "lodash";
import {Admin, validateAdmin} from "../models/admin.js";
import Joi from "joi";
const {compare} = pkg;

export const getMe = async (req, res) => {
  const adminId = req.admin._id;
  if (!adminId) return res.status(401).send("Unauthorized");
  const admin = await Admin.findById(adminId).select("-password");
  res.send(admin);
};

export const login = async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Admin.findOne({email: req.body.email});
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res
    .cookie("admin_token", token, {
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

export const register = async (req, res) => {
  const {error} = validateAdmin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Admin.findOne({email: req.body.email});
  if (user) return res.status(400).send("Admin already registered.");

  user = new Admin(
    _.pick(req.body, ["firstName", "lastName", "email", "password"])
  );
  const salt = await genSalt(10);
  user.password = await hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "firstName", "lastName", "email"]));
};

export const logout = (req, res) => {
  res
    .clearCookie("admin_token", {
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

export const getAllAdmins = async (req, res) => {
  if (!req.admin) return res.status(403).send("Forbidden");

  try {
    const admins = await Admin.find()
      .select("-password") // Exclude password field
      .sort({firstName: 1}); // Sort by firstName
    res.send(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).send("An error occurred while fetching admins.");
  }
};
