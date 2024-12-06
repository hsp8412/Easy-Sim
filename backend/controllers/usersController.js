import pkg from "bcryptjs";
const {hash, genSalt, compare} = pkg;
import _ from "lodash";
import {User, validateUser} from "../models/user.js";
import {Carrier} from "../models/carrier.js";
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
  const users = await User.find({}).select("-password");
  res.send(users);
};

// GET getUserById (admin)
export const getUserById = async (req, res) => {
  try {
    const userId = req.query.id;  // Get ID from query parameter
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(500).send("Error fetching user");
  }
};

// getMyProfile (user)
export const getMyProfile = async (req, res) => {
  const userId = req.user._id;
  if (!userId) return res.status(401).send("Unauthorized");
  const user = await User.findById(userId).select("-password");
  res.send(user);
};

// updateMyProfile (user)
// update email
export const updateMyEmail = async (req, res) => {
  const currentEmail = req.body.currentEmail;
  const updatedEmail = req.body.updatedEmail;
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return res.status(400).send("Invalid user.");

  const emailInDb = await User.findOne({email: updatedEmail});
  if (emailInDb) return res.status(400).send("Email already exists.");

  if (currentEmail === user.email) {
    try {
      user.email = updatedEmail; // Update the user's email
      await user.save(); // Save the updated user document

      res.send({
        message: "Email updated successfully",
        email: user.email,
      });
    } catch (error) {
      res.status(500).send("An error occurred while updating the email.");
    }
  } else {
    res.status(400).send("Email doesn't match");
  }
};

// update password
export const updateMyPassword = async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  console.log(currentPassword);
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return res.status(400).send("Invalid user.");
  if (user.password) {
    const validPassword = await compare(currentPassword, user.password);
    if (!validPassword) return res.status(400).send("Password doesn't match.");
  }
  const salt = await genSalt(10);
  const hashedPassword = await hash(newPassword, salt);
  try {
    user.password = hashedPassword; // Update the user's email
    await user.save(); // Save the updated user document

    res.send({
      message: "Password updated successfully",
      email: user.password,
    });
  } catch (error) {
    res.status(500).send("An error occurred while updating the email.");
  }
};

//updateUserById (admin)
// update user email by Id
export const updateUserEmailById = async (req, res) => {
  // identify role first
  // check admin_auth
  const currentEmail = req.body.currentEmail;
  const updatedEmail = req.body.updatedEmail;
  const userId = req.body.id;
  const user = await User.findById(userId);
  if (!user) return res.status(400).send("Invalid user.");
  if (currentEmail === user.email) {
    try {
      user.email = updatedEmail; // Update the user's email
      await user.save(); // Save the updated user document

      res.send({
        message: "Email updated successfully",
        email: user.email,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(400).send("Email doesn't match");
  }
};

// update user password by Id
export const updateUserPasswordById = async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  console.log(currentPassword);
  const userId = req.body.id;
  const user = await User.findById(userId);
  if (!user) return res.status(400).send("Invalid user.");
  const validPassword = await compare(currentPassword, user.password);
  if (!validPassword) return res.status(400).send("Password doesn't match.");
  const salt = await genSalt(10);
  const hashedPassword = await hash(newPassword, salt);
  try {
    user.password = hashedPassword; // Update the user's email
    await user.save(); // Save the updated user document

    res.send({
      message: "Password updated successfully",
      email: user.password,
    });
  } catch (error) {
    res.status(500).send("An error occurred while updating the email.");
  }
};

// update carrier
// update user email by Id
export const updateCarrierEmailById = async (req, res) => {
  const currentEmail = req.body.currentEmail;
  const updatedEmail = req.body.updatedEmail;
  const userId = req.body.id;
  const user = await Carrier.findById(userId);
  if (!user) return res.status(400).send("Invalid user.");
  if (currentEmail === user.email) {
    try {
      user.email = updatedEmail; // Update the user's email
      await user.save(); // Save the updated user document

      res.send({
        message: "Email updated successfully",
        email: user.email,
      });
    } catch (error) {
      res.status(500).send("An error occurred while updating the email.");
    }
  } else {
    res.status(400).send("Email doesn't match");
  }
};

// update user password by Id
export const updateCarrierPasswordById = async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  console.log(currentPassword);
  const userId = req.body.id;
  const user = await Carrier.findById(userId);
  if (!user) return res.status(400).send("Invalid user.");
  const validPassword = await compare(currentPassword, user.password);
  if (!validPassword) return res.status(400).send("Password doesn't match.");
  const salt = await genSalt(10);
  const hashedPassword = await hash(newPassword, salt);
  try {
    user.password = hashedPassword; // Update the user's email
    await user.save(); // Save the updated user document

    res.send({
      message: "Password updated successfully",
      email: user.password,
    });
  } catch (error) {
    res.status(500).send("An error occurred while updating the email.");
  }
};

// DELETE deleteMyAccount (user)
export const deleteMyAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.send("Account deleted");
};

// DELETE deleteUserById (admin)
export const deleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.body.id);
  res.send("User deleted");
};
