import {
    getMe,
    register,
    userOnly,
    getMyProfile,
    getAllUsers,
    getUserById,
    updateMyEmail,
    updateMyPassword,
    updateUserEmailById,
    updateUserPasswordById,
    updateCarrierEmailById,
    updateCarrierPasswordById,
    deleteMyAccount,
    deleteUserById,
  } from "../controllers/usersController.js";
import {auth} from "../middleware/auth.js";
import {admin_auth} from "../middleware/admin_auth.js";
import express from "express";

const router = express.Router();


// User-specific routes
router.get("/me", auth, getMe);

router.post("/", register);

router.get("/user-only", auth, userOnly);

router.post("/update-my-email", auth, updateMyEmail);
router.post("/update-my-password", auth, updateMyPassword);
router.delete("/delete-my-account", auth, deleteMyAccount);
router.get("/my-profile", auth, getMyProfile);

// Admin-specific routes
router.get("/user-list", admin_auth, getAllUsers);
router.get("/get-user", admin_auth, getUserById);
router.post("/update-user-email", admin_auth, updateUserEmailById);
router.post("/update-user-password", admin_auth, updateUserPasswordById);
router.post("/update-carrier-email", admin_auth, updateCarrierEmailById);
router.post("/update-carrier-password",admin_auth, updateCarrierPasswordById);
router.delete("/delete-user",admin_auth, deleteUserById);

export default router;
