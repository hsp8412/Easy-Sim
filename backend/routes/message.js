import express from "express";
import {sentMessage} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", sentMessage);

export default router;
