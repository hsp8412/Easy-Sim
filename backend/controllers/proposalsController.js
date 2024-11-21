import { Proposal } from "../models/proposal.js";
import Joi from "joi";

const validateProposal = (proposal) => {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.number().required()
  };
  return Joi.object(schema).validate(proposal);
};

export const getAllProposals = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Forbidden");
  
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.send(proposals);
  } catch (error) {
    res.status(500).send("An error occurred while fetching proposals.");
  }
};

export const getMyProposals = async (req, res) => {
  if (req.user.role !== "carrier") return res.status(403).send("Forbidden");
  
  try {
    const proposals = await Proposal.find({ carrierId: req.user._id });
    res.send(proposals);
  } catch (error) {
    res.status(500).send("An error occurred while fetching your proposals.");
  }
};

export const createNewProposal = async (req, res) => {
  if (req.user.role !== "carrier") return res.status(403).send("Forbidden");
  
  const { error } = validateProposal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const proposal = new Proposal({
      carrierId: req.user._id,
      ...req.body,
      status: "pending"
    });

    await proposal.save();
    res.status(201).send(proposal);
  } catch (error) {
    res.status(500).send("An error occurred while creating the proposal.");
  }
};

export const reviewProposalByProposalId = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Forbidden");
  
  try {
    const proposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        reviewNotes: req.body.reviewNotes,
        reviewedBy: req.user._id,
        reviewedAt: new Date()
      },
      { new: true }
    );

    if (!proposal) return res.status(404).send("Proposal not found");
    res.send(proposal);
  } catch (error) {
    res.status(500).send("An error occurred while reviewing the proposal.");
  }
};
