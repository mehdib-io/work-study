import express from "express";
import { verifyToken } from "../controllers/AuthController.js";
import { getUserById, updateUser, deleteUser, followUser } from "../controllers/UserController.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserById); // Récupérer un user
router.put("/:id", verifyToken, updateUser); // Modifier un user
router.delete("/:id", verifyToken, deleteUser); // Supprimer un user
router.post("/:id/follow", verifyToken, followUser); // Suivre/Désuivre un user

export default router;
