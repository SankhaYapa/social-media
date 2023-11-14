import express from "express";
import {
  createConversation,
  getConversationsByUserId,
  getConversationByUserIds,
} from "../controllers/conversations.js";

const router = express.Router();

// Create a new conversation
router.post("/", createConversation);

// Get conversations of a user
router.get("/:userId", getConversationsByUserId);

// Get conversation including two userIds
router.get("/find/:firstUserId/:secondUserId", getConversationByUserIds);

export default router;
