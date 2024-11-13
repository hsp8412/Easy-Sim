import Joi from "joi";
import mongoose from "mongoose";

const refundSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders',
    required: true
  },
  carrierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carriers',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['Requested', 'Processing', 'Approved', 'Rejected'],
    default: 'Requested',
    required: true
  },
  requestInformation: {
    type: String,
    required: true,
    maxlength: 1000
  }
});

export const Refund = mongoose.model("refunds", refundSchema);

export function validateRefund(refund) {
  const schema = Joi.object({
    orderId: Joi.string().required(),
    carrierId: Joi.string().required(),
    userId: Joi.string().required(),
    productId: Joi.string().required(),
    status: Joi.string().valid('Requested', 'Processing', 'Approved', 'Rejected'),
    requestInformation: Joi.string().max(1000).required()
  });
  return schema.validate(refund);
}