import express from "express";
import {getMe, login, logout, register} from "../controllers/adminController.js";
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

export default router;