import Joi from "joi";
import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
  consumed: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const Token = mongoose.model("tokens", TokenSchema);

export function validateToken(token) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    token: Joi.string().required(),
  });
  return schema.validate(token);
}
