import {carrier_auth} from "../middleware/carrier_auth.js";
import {admin_auth} from "../middleware/admin_auth.js";
import {
  getMyProposals,
  createNewProposal,
  getAllProposals
} from "../controllers/proposalsController.js";
import express from "express";

const router = express.Router();

// Carrier routes
router.get("/get-my-proposals", carrier_auth, getMyProposals);
router.post("/", carrier_auth, createNewProposal);

// Admin routes
router.get("/all", admin_auth, getAllProposals);

export default router;