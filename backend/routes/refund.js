import express from "express";
import {
  getMyRefunds,
  reviewRefundByRefundId,
} from "../controllers/refundsController.js";
import {carrier_auth} from "../middleware/carrier_auth.js";

const router = express.Router();

router.get("/get-my-refunds", carrier_auth, getMyRefunds);

router.post("/review-refund", carrier_auth, reviewRefundByRefundId);

export default router;
