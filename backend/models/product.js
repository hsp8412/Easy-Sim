import Joi from "joi";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  carrier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carriers',
    required: true
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'countries',
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
  size: {
    type: Number,
    required: true,
    min: 1,
    comment: "Size in GB"
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
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true
  }
});

export const Product = mongoose.model("products", productSchema);

export function validateProduct(product) {
  const schema = Joi.object({
    carrier_id: Joi.string().required(),
    countryId: Joi.string().required(),
    duration: Joi.number().min(1).required(),
    speed: Joi.number().min(1).required(),
    size: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
    identityVerification: Joi.boolean().required(),
    topUp: Joi.boolean().required(),
    country: Joi.string().required(),
    createdDate: Joi.date()
  });
  return schema.validate(product);
}