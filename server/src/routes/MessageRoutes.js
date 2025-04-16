import express from "express";
import { verifyToken } from "../controllers/AuthController.js";
import { sendMessage, getMessages } from "../controllers/MessageController.js";

const router = express.Router();

router.post("/", verifyToken, sendMessage); // Envoyer un message
router.get("/:recipientId", verifyToken, getMessages); // Récupérer les messages

export default router;
