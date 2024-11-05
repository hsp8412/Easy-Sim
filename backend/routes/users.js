import {getMe, register} from "../controllers/usersController.js";
import {auth} from "../middleware/auth.js";
import express from "express";
import {userOnly} from "../controllers/usersController.js";
const router = express.Router();

router.get("/me", auth, getMe);

router.post("/", register);

router.get("/user-only", auth, userOnly);

export default router;
