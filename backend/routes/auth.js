import express from "express";
import {login, logout} from "../controllers/authController.js";
const router = express.Router();

router.post("/", login);
router.delete("/", logout);

export default router;
