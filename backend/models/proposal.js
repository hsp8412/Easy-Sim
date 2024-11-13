import Joi from "joi";
import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  carrierId: {
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
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
    required: true
  }
});

export const Proposal = mongoose.model("proposals", proposalSchema);

export function validateProposal(proposal) {
  const schema = Joi.object({
    carrierId: Joi.string().required(),
    duration: Joi.number().min(1).required(),
    speed: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
    identityVerification: Joi.boolean().required(),
    topUp: Joi.boolean().required(),
    country: Joi.string().required(),
    status: Joi.string().valid('Pending', 'Approved', 'Rejected')
  });
  return schema.validate(proposal);
}