import pkg from "bcryptjs";
const {hash, genSalt} = pkg;

import _ from "lodash";
import {User, validateUser} from "../models/user.js";

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
