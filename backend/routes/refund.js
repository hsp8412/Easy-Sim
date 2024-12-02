import express from "express";
import {getMyRefunds} from "../controllers/refundsController.js";
import {carrier_auth} from "../middleware/carrier_auth.js";

const router = express.Router();

router.get("/get-my-refunds", carrier_auth, getMyRefunds);

export default router;
