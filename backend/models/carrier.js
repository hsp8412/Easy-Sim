import Joi from "joi";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const carrierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

carrierSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      role: "carrier",
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

export const Carrier = mongoose.model("carriers", carrierSchema);

export function validateCarrier(carrier) {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(carrier);
}