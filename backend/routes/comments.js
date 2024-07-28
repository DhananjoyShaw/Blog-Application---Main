import express from 'express';
import { createComment, updateComment, deleteComment, getPostComments } from '../controllers/commentController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.put("/:id", verifyToken, updateComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/post/:postId", getPostComments);

export default router;
