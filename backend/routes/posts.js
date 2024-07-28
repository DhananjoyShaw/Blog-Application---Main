import express from 'express';
import { createPost, updatePost, deletePost, getPost, getPosts, getUserPosts } from '../controllers/postController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
router.get("/:id", getPost);
router.get("/", getPosts);
router.get("/user/:userId", getUserPosts);

export default router;
