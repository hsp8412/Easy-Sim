import Joi from "joi";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  carrierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carriers",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
    index: true, // Added index for better query performance on date-based queries
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed", "Refunded"],
    required: true,
  },
  delivered: {
    type: Boolean,
    default: false,
    required: true,
  },
  usage: {
    type: Number,
    default: 0,
    required: true,
  },
  sessionId: {
    type: String,
    required: false,
  },
});

// Add compound index for common queries
orderSchema.index({userId: 1, createdDate: -1});
orderSchema.index({carrierId: 1, createdDate: -1});

export const Order = mongoose.model("orders", orderSchema);

export function validateOrder(order) {
  const schema = Joi.object({
    carrierId: Joi.string().required(),
    userId: Joi.string().required(),
    productId: Joi.string().required(),
    paymentStatus: Joi.string()
      .valid("Pending", "Completed", "Failed", "Refunded")
      .required(),
    delivered: Joi.boolean(),
    createdDate: Joi.date(),
  });
  return schema.validate(order);
}
