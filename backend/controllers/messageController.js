import {verifyRecaptcha} from "../utils/recaptcha.js";
import {sendContactMessage} from "../utils/email.js";
import Joi from "joi";

const schema = Joi.object({
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  message: Joi.string().max(2000).required(),
  token: Joi.string().required(),
});

export const sentMessage = async (req, res) => {
  const {error} = schema.validate(req.body);
  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }

  const {firstName, lastName, email, message, token} = req.body;

  let recaptchaVerified = false;
  try {
    recaptchaVerified = await verifyRecaptcha(token);
    if (!recaptchaVerified) {
      console.log("ReCaptcha verification failed");
      res.status(400).send("ReCaptcha verification failed");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("ReCaptcha verification failed");
  }

  try {
    await sendContactMessage(firstName, lastName, message, email);
    return res.status(200).send("Email sent successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Email failed to send");
  }
};
