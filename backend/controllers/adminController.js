import pkg from "bcryptjs";
const {hash, genSalt} = pkg;

import _ from "lodash";
import {Admin, validateAdmin} from "../models/admin.js";
import Joi from "joi";
const {compare} = pkg;

// TO DO 
// adminController
// - GET getMe (admin)
// - POST adminLogin (admin)
// - POST adminLogout (admin)

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
  