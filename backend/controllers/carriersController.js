import pkg from "bcryptjs";
const {hash, genSalt, compare} = pkg;

import _ from "lodash";
import {Carrier} from "../models/carrier.js";
import Joi from "joi";
import {v2 as cloudinary} from "cloudinary";
import {promises as fs} from "fs";
import path from "path";
import {uploadFileToCloudinary} from "../utils/cloudinary.js";

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
  if (!req.admin) return res.status(403).send("Forbidden");

  const file = req.file;
  const data = req.body;

  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  const {error} = schema.validate(data);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    let carrier = await Carrier.findOne({email: req.body.email});
    if (carrier) return res.status(400).send("Carrier already registered.");

    const cloudinaryResponse = await uploadFileToCloudinary(file.path);
    const logoUrl = cloudinaryResponse.secure_url;

    carrier = new Carrier({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      logoUrl,
    });

    const salt = await genSalt(10);
    carrier.password = await hash(carrier.password, salt);
    await carrier.save();

    res.send(_.pick(carrier, ["_id", "name", "email", "logoUrl"]));
  } catch (error) {
    console.error("Error creating carrier:", error);
    res.status(500).send("An error occurred while creating carrier.");
  }
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
    .cookie("carrier_token", token, {
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
    .clearCookie("carrier_token", {
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
    id: Joi.string().required(),
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
    console.error("Error updating carrier password:", error);
    res.status(500).send("An error occurred while updating the email.");
  }
};

// DELETE deleteUserById (admin)
export const deleteCarrierById = async (req, res) => {
  await Carrier.findByIdAndDelete(req.body.id);
  res.send("Carrier deleted");
};

export const getAllCarriers = async (req, res) => {
  if (!req.admin) return res.status(403).send("Forbidden");

  try {
    const carriers = await Carrier.find()
      .select("-password") // Exclude password
      .sort({name: 1}); // Sort by name
    res.send(carriers);
  } catch (error) {
    console.error("Error fetching carriers:", error);
    res.status(500).send("An error occurred while fetching carriers.");
  }
};

export const updateCarrierLogoById = async (req, res) => {
  if (!req.admin) return res.status(403).send("Forbidden");

  const file = req.file;
  const userId = req.body.carrierId;

  try {
    const carrier = await Carrier.findById(userId);
    if (!carrier) return res.status(400).send("Invalid user.");

    const result = await uploadFileToCloudinary(file.path);

    carrier.logoUrl = result.secure_url;
    await carrier.save();

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });

    res.send({
      message: "logoUrl updated successfully",
      logoUrl: carrier.logoUrl,
    });
  } catch (error) {
    console.error("Error updating carrier logo:", error);
    res.status(500).send(error.message);
  }
};

export const getCarrierById = async (req, res) => {
  try {
    if (!req.admin) return res.status(403).send("Forbidden");
    const id = req.params.id;
    const carrier = await Carrier.findById(id).select("-password");
    if (!carrier) return res.status(400).send("Invalid user.");
    res.send(carrier);
  } catch (error) {
    console.error("Error fetching carrier:", error);
    res.status(500).send(error.message);
  }
};
