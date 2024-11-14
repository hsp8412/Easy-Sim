import pkg from "bcryptjs";
const {hash, genSalt} = pkg;

import _ from "lodash";
import {User, validateUser} from "../models/user.js";

// usersController
// - GET getMe (user)
// - GET getAllUsers (admin)
// - GET getUserById (admin)
// - POST updateMyProfile (user)
// - POST updateUserById (admin)
// - DELETE deleteMyAccount (user)
// - DELETE deleteUserById (admin)

export const getMe = async (req, res) => {
  const userId = req.user._id;
  if (!userId) return res.status(401).send("Unauthorized");
  const user = await User.findById(userId).select("-password");
  res.send(user);
};

export const register = async (req, res) => {
  const {error} = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send("User already registered.");

  user = new User(
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

// this is a user-only protected route for testing
export const userOnly = async (req, res) => {
  if (req.user && req.user.role == "user") {
    res.status(200).send("Success");
  } else {
    res.status(403).send("Forbidden");
  }
};

// GET getAllUsers (admin)
export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

// GET getUserById (admin)
export const getUserById = async (req, res) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).send("User not found.");
  res.send(user);
};

// getMyProfile (user)
export const getMyProfile = async (req, res) => {
  const userId = req.user._id;
  if (!userId) return res.status(401).send("Unauthorized");
  const user = await User.findById(userId);
  res.send(user);
};

// updateMyProfile (user)
// update password
// update email
export const updateMyProfile = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
  res.send(user);
};

//updateUserById (admin)
// update carrier
// update user
export const updateUserById = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.send(user);
};

// DELETE deleteMyAccount (user)
export const deleteMyAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.send("Account deleted");
};

// DELETE deleteUserById (admin)
export const deleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("User deleted");
};