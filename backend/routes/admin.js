import express from "express";
import {getMe, login, logout, register, getAllAdmins} from "../controllers/adminController.js";  // Add getAllAdmins
import {admin_auth} from "../middleware/admin_auth.js";

const router = express.Router();

// admin login
router.post("/", login);

// admin logout 
router.delete("/", logout);

// getMe()
router.get("/me", admin_auth, getMe);

// register()
router.post("/register", register);

// get all admins (new route)
router.get("/all", admin_auth, getAllAdmins);

export default router;