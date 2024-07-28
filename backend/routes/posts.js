import express from 'express';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// CREATE
router.post("/create", verifyToken, async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ postId: req.params.id });
        res.status(200).json("Post has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET POST DETAILS
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET POSTS
router.get("/", async (req, res) => {
    const search = req.query.search || req.query.query;

    try {
        const searchFilter = search ? { title: { $regex: search, $options: "i" } } : {};
        console.log(`Fetching posts with search filter: ${JSON.stringify(searchFilter)}`);

        const posts = await Post.find(searchFilter);
        res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// GET USER POSTS
router.get("/user/:userId", async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
