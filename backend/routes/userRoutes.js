
import express from "express";
// import products from '../data/products.js';
import {authUser,registerUser, logoutUser, getUserById, getUserProfile, getUsers, updateUserProfile, updateUser, deleteUsers} from "../controllers/userController.js";
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin,getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUsers).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;
