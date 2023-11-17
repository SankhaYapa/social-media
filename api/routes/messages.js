import express from "express";
import { router as messageRouter, addMessage, getMessagesByConversationId } from "../controllers/messages.js";

const router = express.Router();

// Add a new message
router.post("/", addMessage);

// Get messages by conversation ID
router.get("/:conversationId", getMessagesByConversationId);

export default router;
