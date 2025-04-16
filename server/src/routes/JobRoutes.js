import express from "express";
import { verifyToken } from "../controllers/AuthController.js";
import { getAllJobs, createJob, updateJob, deleteJob, applyForJob } from "../controllers/JobController.js";

const router = express.Router();

router.get("/", getAllJobs); // 🔍 Voir toutes les offres
router.post("/", verifyToken, createJob); // Publier une offre
router.put("/:id", verifyToken, updateJob); // Modifier une offre
router.delete("/:id", verifyToken, deleteJob); // Supprimer une offre
router.post("/:id/apply", verifyToken, applyForJob); // Candidater

export default router;
