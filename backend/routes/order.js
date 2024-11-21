import {
  getMyOrders,
  getCarrierOrders,
  getOrdersByProductId,
  createNewOrder,
  updateDelivered,
} from "../controllers/ordersController.js";
import { carrier_auth } from "../middleware/carrier_auth.js";
import { admin_auth } from "../middleware/admin_auth.js";
import { auth } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

// user routes
router.get("/get-my-orders", auth, getMyOrders);
router.post("/create-new-order", auth, createNewOrder);

// Carrier-specific routes
router.get("/get-carrier-orders", carrier_auth, getCarrierOrders);
router.get("/get-orders-by-product-id", carrier_auth, getOrdersByProductId);
router.post("/update-delivered", carrier_auth, updateDelivered);

export default router;
