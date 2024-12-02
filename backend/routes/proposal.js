import {carrier_auth} from "../middleware/carrier_auth.js";
import {
  getMyProposals,
  createNewProposal,
} from "../controllers/proposalsController.js";
import express from "express";

const router = express.Router();

router.get("/get-my-proposals", carrier_auth, getMyProposals);

router.post("/", carrier_auth, createNewProposal);

export default router;
