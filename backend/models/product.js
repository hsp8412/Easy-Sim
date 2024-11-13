import Joi from "joi";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  carrier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carriers',
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  speed: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  identityVerification: {
    type: Boolean,
    required: true,
    default: false
  },
  topUp: {
    type: Boolean,
    required: true,
    default: false
  },
  country: {
    type: String,
    required: true
  }
});

export const Product = mongoose.model("products", productSchema);

export function validateProduct(product) {
  const schema = Joi.object({
    carrier_id: Joi.string().required(),
    duration: Joi.number().min(1).required(),
    speed: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
    identityVerification: Joi.boolean().required(),
    topUp: Joi.boolean().required(),
    country: Joi.string().required()
  });
  return schema.validate(product);
}