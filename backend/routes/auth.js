import express from "express";
import {googleCallBack, login, logout} from "../controllers/authController.js";
import passport from "../utils/passport.js";

const router = express.Router();

router.post("/", login);
router.delete("/", logout);

router.get(
  "/google",
  passport.authenticate("google", {scope: ["profile", "email"]})
);

router.get(
  "/google/callback",
  passport.authenticate("google", {failureRedirect: "/login"}),
  googleCallBack
);

export default router;
