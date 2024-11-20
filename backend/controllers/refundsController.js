import { Refund } from "../models/refund.js";
import Joi from "joi";

const validateRefund = (refund) => {
  const schema = {
    reason: Joi.string().required(),
    amount: Joi.number().required()
  };
  return Joi.object(schema).validate(refund);
};

export const getMyRefunds = async (req, res) => {
  if (req.user.role !== "carrier") return res.status(403).send("Forbidden");
  
  try {
    const refunds = await Refund.find({ carrierId: req.user._id });
    res.send(refunds);
  } catch (error) {
    res.status(500).send("An error occurred while fetching your refunds.");
  }
};

export const createNewRefund = async (req, res) => {
  const { error } = validateRefund(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const refund = new Refund({
      userId: req.user._id,
      ...req.body,
      status: "pending"
    });

    await refund.save();
    res.status(201).send(refund);
  } catch (error) {
    res.status(500).send("An error occurred while creating the refund.");
  }
};

export const reviewRefundByRefundId = async (req, res) => {
  if (req.user.role !== "carrier") return res.status(403).send("Forbidden");
  
  try {
    const refund = await Refund.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        reviewNotes: req.body.reviewNotes,
        reviewedBy: req.user._id,
        reviewedAt: new Date()
      },
      { new: true }
    );

    if (!refund) return res.status(404).send("Refund not found");
    res.send(refund);
  } catch (error) {
    res.status(500).send("An error occurred while reviewing the refund.");
  }
};