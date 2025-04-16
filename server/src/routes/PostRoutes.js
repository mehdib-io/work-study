import express from "express";
import { verifyToken } from "../controllers/AuthController.js";
import { getAllPosts, createPost, likePost, commentPost, deletePost } from "../controllers/PostController.js";

const router = express.Router();

router.get("/", getAllPosts); // Voir tous les posts
router.post("/", verifyToken, createPost); // Publier un post
router.post("/:id/like", verifyToken, likePost); // Liker un post
router.post("/:id/comment", verifyToken, commentPost); // Commenter un post
router.delete("/:id", verifyToken, deletePost); // Supprimer un post

export default router;
