import {
    getMe,
    register,
    userOnly,
    getMyProfile,
    getAllUsers,
    getUserById,
    updateMyProfile,
    updateUserById,
    deleteMyAccount,
    deleteUserById,
  } from "../controllers/usersController.js";
import {auth} from "../middleware/auth.js";
import express from "express";

const router = express.Router();


// User-specific routes
router.get("/me", auth, getMe);

router.post("/", register);

router.get("/user-only", auth, userOnly);

router.post("/update-profile", auth, updateMyProfile);
router.delete("/delete-my-account", auth, deleteMyAccount);
router.get("/my-profile", auth, getMyProfile);

// Admin-specific routes
router.get("/user-list", getAllUsers);
router.get("/get-user/:id", getUserById);
router.post("/update-user/:id", updateUserById);
router.delete("/delete-user/:id", deleteUserById);



export default router;
