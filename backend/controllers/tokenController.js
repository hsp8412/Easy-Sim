import Joi from "joi";
import {User} from "../models/user.js";
import {Token} from "../models/token.js";
import {createId} from "@paralleldrive/cuid2";
import {sendRecoveryToken} from "../utils/email.js";
import pkg from "bcryptjs";
const {hash} = pkg;

const EXPIRATION_HOURS = 24;

export const issueToken = async (req, res) => {
  //Get email from request body'
  const {email} = await req.body;

  const validationSchema = Joi.object({
    email: Joi.string().email().required().max(1280),
  });

  //validate email input
  const {error} = validationSchema.validate({email});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check if user with the input email exists
  const user = await User.findOne({email: email});
  if (!user) {
    return res.status(200).send("Success");
  }

  //check if the user has already requested two other password recovery tokens today
  const tokens = await Token.find({userId: user._id});
  const tokenFromToday = tokens.filter((token) => {
    const today = new Date();
    const tokenDate = new Date(token.createdAt);
    return (
      today.getDate() === tokenDate.getDate() &&
      today.getMonth() === tokenDate.getMonth() &&
      today.getFullYear() === tokenDate.getFullYear()
    );
  });

  //If the user has already requested two other password recovery tokens today, return with an error
  if (tokenFromToday.length >= 3) {
    return res.status(429).send("Too many requests");
  }

  //create token
  const token = createId();

  const tokenObject = await Token.create({
    userId: user._id,
    token: token,
  });

  await tokenObject.save();

  //Get Recovery URL
  const recoveryUrl = process.env.FRONTEND_URL + "/login/reset/" + token;

  //send email
  try {
    await sendRecoveryToken(email, recoveryUrl);
  } catch (e) {
    res.status(500).send("Error when sending the token");
  }

  return res.status(200).send("Success");
};

export const validateToken = async (req, res) => {
  const token = await Token.findOne({
    token: req.params.token,
  });

  //validate token and user
  if (!token || token.consumed === true) {
    return res.status(400).send("Invalid token");
  }

  const user = await User.findById(token.userId);
  if (!user) {
    return res.status(400).send("Invalid token");
  }

  //check if expired
  const tokenDate = new Date(token.createdAt);
  let diff = Date.now() - tokenDate.getTime();
  let diffHours = diff / (1000 * 60 * 60);
  if (diffHours > EXPIRATION_HOURS) {
    return res.status(400).send("Token expired");
  }

  //return 200 if valid
  return res.status(200).send("Success");
};

export const consumeToken = async (req, res) => {
  const {token, password} = req.body;
  const tokenObject = await Token.findOne({
    token: token,
  });

  //validate token and user
  if (!tokenObject || tokenObject.consumed === true) {
    return res.status(400).send("Invalid token");
  }

  const user = await User.findById(tokenObject.userId);
  if (!user) {
    return res.status(400).send("Invalid token");
  }

  //check if expired
  const tokenDate = new Date(tokenObject.createdAt);
  let diff = Date.now() - tokenDate.getTime();
  let diffHours = diff / (1000 * 60 * 60);
  if (diffHours > EXPIRATION_HOURS) {
    return res.status(400).send("Token expired");
  }

  const validationSchema = Joi.object({
    password: Joi.string().required().max(1280),
  });

  //validate password input
  const {error} = validationSchema.validate({password});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //hash password
  const saltRounds = 10;
  const passwordHash = await hash(password, saltRounds);

  //update user password
  user.password = passwordHash;
  await user.save();

  tokenObject.consumed = true;
  await tokenObject.save();

  return res.status(200).send("Success");
};
