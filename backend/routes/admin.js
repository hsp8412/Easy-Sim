import express from "express";
import {getMe, login, logout} from "../controllers/adminController.js";
import {auth} from "../middleware/admin_auth.js";

const router = express.Router();


// admin login
router.post("/", login);

// admin logout 
router.delete("/", logout);

// getMe()
router.get("/me", auth, getMe);


export default router;