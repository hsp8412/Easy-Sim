import {Refund} from "../models/refund.js";
import {Order} from "../models/order.js";
import Joi from "joi";

const validateRefund = (refund) => {
  const schema = {
    orderId: Joi.string().required(),
    reason: Joi.string().required(),
  };
  return Joi.object(schema).validate(refund);
};

export const getMyRefunds = async (req, res) => {
  if (req.user.role !== "carrier") return res.status(403).send("Forbidden");

  try {
    const refunds = await Refund.find({carrierId: req.user._id})
      .populate({
        path: "userId",
        select: "firstName lastName email",
      })
      .populate({
        path: "productId",
        select: "country duration size price",
      })
      .lean();
    // console.log(refunds);
    const refundsToReturn = refunds.map((refund) => ({
      ...refund,
      userName: `${refund.userId.firstName} ${refund.userId.lastName}`,
      userEmail: refund.userId.email,
      userId: refund.userId._id,
      productId: refund.productId._id,
      country: refund.productId.country,
      duration: refund.productId.duration,
      size: refund.productId.size,
      price: refund.productId.price,
    }));
    console.log(refundsToReturn);

    res.send(refundsToReturn);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching your refunds.");
  }
};

export const createNewRefund = async (req, res) => {
  const {error} = validateRefund(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {orderId, reason} = req.body;

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).send("Order not found");

  const refundExists = await Refund.findOne({
    orderId,
    userId: req.user._id,
  });
  if (refundExists)
    return res
      .status(400)
      .send("You have already requested a refund for this order");

  if (order.paymentStatus !== "Completed")
    return res
      .status(400)
      .send("Refund can only be requested for completed orders");

  try {
    const refund = new Refund({
      userId: req.user._id,
      carrierId: order.carrierId,
      orderId,
      productId: order.productId,
      status: "Requested",
      requestInformation: reason,
    });

    await refund.save();
    res.status(201).send(refund);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while creating the refund.");
  }
};

export const reviewRefundByRefundId = async (req, res) => {
  if (req.user.role !== "carrier") return res.status(403).send("Forbidden");

  const {refundId, status} = req.body;
  if (status !== "Approved" && status !== "Rejected" && status !== "Requested")
    return res.status(400).send("Invalid status");
  try {
    const refund = await Refund.findById(refundId);
    if (!refund) return res.status(404).send("Refund not found");
    if (refund.carrierId.toString() !== req.user._id)
      return res
        .status(403)
        .send("You are not authorized to review this refund.");

    refund.status = status;
    await refund.save();
    res.send(refund);
  } catch (error) {
    res.status(500).send("An error occurred while reviewing the refund.");
  }
};
