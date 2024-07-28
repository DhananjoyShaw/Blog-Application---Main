import express from 'express';
import { register, login, logout, refetchUser } from '../controllers/authController.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refetch", refetchUser);

export default router;
