import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser); // Inscription
router.post("/login", loginUser); // Connexion
router.get("/me", getMe); // Données de l'utilisateur connecté 

export default router;
