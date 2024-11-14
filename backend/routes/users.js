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
router.get("/get-user/:id", getUserById);
router.post("/update-user-email", updateUserEmailById);
router.post("/update-user-password", updateUserPasswordById);
router.post("/update-carrier-email", updateCarrierEmailById);
router.post("/update-carrier-password", updateCarrierPasswordById);
router.delete("/delete-user/:id", deleteUserById);



export default router;
