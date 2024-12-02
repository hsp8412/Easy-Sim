import pkg from "bcryptjs";
const {hash, genSalt} = pkg;

import _ from "lodash";
import {Carrier, validateCarrier} from "../models/carrier.js";
import Joi from "joi";
const {compare} = pkg;
import {v2 as cloudinary} from "cloudinary";
import {promises as fs} from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// carriersController
// - GET getMe (carrier) // get token
// - POST carrierLogin (carrier)
// - POST carrierLogout (carrier)
// - POST updateMyProfile (carrier)
// - POST createNewCarrier (admin) // get role from middleware
// - POST updateCarrierById (admin)
// - DELETE deleteCarrierById (admin)

export const getMe = async (req, res) => {
  const carrierId = req.user._id;
  if (!carrierId) return res.status(401).send("Unauthorized");
  const carrier = await Carrier.findById(carrierId).select("-password");
  res.send(carrier);
};

export const register = async (req, res) => {
  const {error} = validateCarrier(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Carrier.findOne({email: req.body.email});
  if (user) return res.status(400).send("User already registered.");

  user = new Carrier(_.pick(req.body, ["name", "email", "password"]));
  const salt = await genSalt(10);
  user.password = await hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
};

export const login = async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Carrier.findOne({email: req.body.email});
  if (!user) return res.status(400).send("Invalid email or password.");

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
      name: user.name,
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

// getMyProfile (carrier)
export const getMyProfile = async (req, res) => {
  const userId = req.user._id;
  if (!userId) return res.status(401).send("Unauthorized");
  const user = await Carrier.findById(userId).select("-password");
  res.send(user);
};

function validateUpdateEmailInput(req) {
  const schema = Joi.object({
    currentEmail: Joi.string().min(5).max(255).required().email(),
    updatedEmail: Joi.string().min(5).max(255).required().email(),
  }).unknown(true); // Allows additional fields without validation

  return schema.validate(req.body);
}

function validateUpdatePasswordInput(req) {
  const schema = Joi.object({
    currentPassword: Joi.string().min(5).max(255).required(),
    newPassword: Joi.string().min(5).max(255).required(),
  }).unknown(true); // Allows additional fields without validation

  return schema.validate(req.body);
}

// updateMyProfile (carrier)
// update email
export const updateMyEmail = async (req, res) => {
  const {error} = validateUpdateEmailInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const currentEmail = req.body.currentEmail;
  const updatedEmail = req.body.updatedEmail;
  const userId = req.user._id;
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

// update password
export const updateMyPassword = async (req, res) => {
  const {error} = validateUpdatePasswordInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {currentPassword, newPassword} = req.body;
  console.log(currentPassword);
  const userId = req.user._id;
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
// update logo Url
export const updateMyLogo = async (req, res) => {
  console.log(
    process.env.CLOUDINARY_API_KEY,
    process.env.CLOUDINARY_API_SECRET,
    process.env.CLOUDINARY_CLOUD_NAME
  );

  // const updatedLogoUrl = req.body.updatedLogoUrl;

  const userId = req.user._id;
  const file = req.file;

  try {
    const user = await Carrier.findById(userId);
    if (!user) return res.status(400).send("Invalid user.");

    const result = await cloudinary.uploader.upload(file.path);

    user.logoUrl = result.secure_url;
    await user.save();

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });

    res.send({
      message: "logoUrl updated successfully",
      logoUrl: user.logoUrl,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// update carrier
// update carrier email by Id
export const updateCarrierEmailById = async (req, res) => {
  const {error} = validateUpdateEmailInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);
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

// update carrier password by Id
export const updateCarrierPasswordById = async (req, res) => {
  const {error} = validateUpdatePasswordInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);
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

// DELETE deleteUserById (admin)
export const deleteCarrierById = async (req, res) => {
  await Carrier.findByIdAndDelete(req.body.id);
  res.send("Carrier deleted");
};
