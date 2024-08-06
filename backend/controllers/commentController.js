import Comment from '../models/Comment.js';

// Create a new comment
export const createComment = async (req, res) => {
    try {
        const { comment, author, postId, userId } = req.body;
        if (!comment || !author || !postId || !userId) {
            return res.status(400).json("Missing required fields");
        }

        const newComment = new Comment({ comment, author, postId, userId });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a comment by ID
export const updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json("Comment not found");
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a comment by ID
export const deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);

        if (!deletedComment) {
            return res.status(404).json("Comment not found");
        }
        res.status(200).json("Comment has been deleted!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all comments for a specific post
export const getPostComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });

        if (!comments.length) {
            return res.status(404).json("No comments found for this post");
        }
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
