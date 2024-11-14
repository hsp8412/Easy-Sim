import Joi from "joi";
import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ISO: {
    type: String,
    required: true,
    unique: true,
    length: 2
  },
  image: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    required: true
  }
});

export const Country = mongoose.model("countries", countrySchema);

export function validateCountry(country) {
  const schema = Joi.object({
    name: Joi.string().required(),
    ISO: Joi.string().length(2).required(),
    image: Joi.string().required(),
    flag: Joi.string().required()
  });
  return schema.validate(country);
}