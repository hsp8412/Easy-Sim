import {
  getAllProducts,
  getProductsByCountryId,
  getMyProducts,
  updateMyProductStatus,
  getProductsByCarrierId,
  updateProductStatusByProductId,
  getProductById,
} from "../controllers/productsController.js";
import {carrier_auth} from "../middleware/carrier_auth.js";
import {admin_auth} from "../middleware/admin_auth.js";
import express from "express";

const router = express.Router();

// everyone routes
router.get("/get-all-products", getAllProducts);
router.get("/get-by-id/:productId", getProductById);
router.get("/get-products-by-country-id/:countryId", getProductsByCountryId);

// Carrier-specific routes
router.get("/get-my-products", carrier_auth, getMyProducts);
router.post("/update-product-status", carrier_auth, updateMyProductStatus);

// Admin-specific routes
router.get("/get-product-by-carrier-id", admin_auth, getProductsByCarrierId);
router.post(
  "/update-products-status-by-carrier-id",
  admin_auth,
  updateProductStatusByProductId
);

export default router;
