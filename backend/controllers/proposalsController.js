import {Proposal} from "../models/proposal.js";
import {Product} from "../models/product.js";

import Joi from "joi";

const validateProposal = (proposal) => {
  const schema = {
    carrierId: Joi.string().required(),
    carrier: Joi.string().required(),
    countryId: Joi.string().required(),
    duration: Joi.number().min(1).max(30).required(),
    size: Joi.number().min(1).max(50).required(),
    speed: Joi.string().required(),
    price: Joi.number().min(0).max(100000).required(),
    identityVerification: Joi.boolean().required(),
    topUp: Joi.boolean().required(),
    country: Joi.string().required(),
    extraInfo: Joi.string().allow("").optional(),
  };
  return Joi.object(schema).validate(proposal);
};

export const getAllProposals = async (req, res) => {
  if (!req.admin) return res.status(403).send("Forbidden");

  try {
    const proposals = await Proposal.find()
      .populate({
        path: "carrierId",
        select: "name",  
        model: "carriers" 
      })
      .sort({ createdAt: -1 });

    const transformedProposals = proposals.map(proposal => {
      const proposalObj = proposal.toObject();
      
      return {
        ...proposalObj,
        carrier: proposalObj.carrierId?.name || 'Unknown Carrier', // Use the populated carrier name
      };
    });

    res.send(transformedProposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).send("An error occurred while fetching proposals.");
  }
};

export const getMyProposals = async (req, res) => {
  if (req.user.role !== "carrier") return res.status(403).send("Forbidden");

  try {
    let proposals = await Proposal.find({carrierId: req.user._id})
      .populate({
        path: "carrierId",
        select: "name",
      })
      .populate({
        path: "countryId",
        select: "name",
      })
      .lean();
    const proposalsToReturn = proposals.map((proposal) => {
      return {
        ...proposal,
        carrierId: proposal.carrierId._id,
        carrier: proposal.carrierId.name,
        countryId: proposal.countryId._id,
        country: proposal.countryId.name,
      };
    });
    console.log(proposalsToReturn[0]);
    console.log(typeof proposals[0].createdDate);
    res.send(proposalsToReturn);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching your proposals.");
  }
};

export const createNewProposal = async (req, res) => {
  console.log(req.user);
  if (req.user.role !== "carrier") return res.status(403).send("Forbidden");
  console.log(req.body);
  const {error} = validateProposal(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const proposal = new Proposal({
      carrierId: req.user._id,
      ...req.body,
      status: "Pending",
      createdDate: new Date(),
    });
    await proposal.save();
    res.status(201).send(proposal);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while creating the proposal.");
  }
};

export const reviewProposalByProposalId = async (req, res) => {
  if (!req.admin) return res.status(403).send("Forbidden");

  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).send("Proposal not found");

    if (req.body.status === "Approved") {
      // Create new product from proposal
      const newProduct = new Product({
        carrierId: proposal.carrierId,
        countryId: proposal.countryId,
        duration: proposal.duration,
        speed: proposal.speed,
        size: proposal.size,
        price: proposal.price,
        identityVerification: proposal.identityVerification,
        topUp: proposal.topUp,
        country: proposal.country,
        createdDate: new Date(),
        status: "active"
      });

      await newProduct.save();
    }

    // Update proposal status
    proposal.status = req.body.status;
    proposal.reviewNotes = req.body.reviewNotes;
    proposal.reviewedBy = req.admin._id;
    proposal.reviewedAt = new Date();
    
    await proposal.save();

    res.send(proposal);
  } catch (error) {
    console.error("Review error:", error);
    res.status(500).send("An error occurred while reviewing the proposal.");
  }
};