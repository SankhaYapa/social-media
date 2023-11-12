import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getPost,
  getTimeline,
  getUserPosts,
} from "../controllers/post.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Create a post
router.post("/", createPost);

// Update a post
router.put("/:id",  updatePost);

// Delete a post
router.delete("/:id", deletePost);

// Like/Dislike a post
router.put("/:id/like", likeDislikePost);

// Get a post
router.get("/:id", getPost);

// Get timeline posts
router.get("/timeline/:userId",  getTimeline);

// Get user's all posts
router.get("/profile/:username", getUserPosts);

export default router;
