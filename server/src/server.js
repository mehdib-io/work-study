import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db_config.js";
import authRoutes from "./routes/AuthRoutes.js"; // Import des routes Auth
import userRoutes from "./routes/UserRoutes.js";
import jobRoutes from "./routes/JobRoutes.js";
import postRoutes from "./routes/PostRoutes.js";
import messagesRoutes from "./routes/MessagesRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messagesRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
