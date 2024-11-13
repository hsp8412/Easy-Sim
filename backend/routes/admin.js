import express from "express";
import {getMe, login, logout} from "../controllers/adminController.js";
import {admin_auth} from "../middleware/auth.js";

const router = express.Router();


// admin login
router.post("/", login);

// admin logout 
router.delete("/", logout);

// getMe()
router.get("/me", admin_auth, getMe);


export default router;