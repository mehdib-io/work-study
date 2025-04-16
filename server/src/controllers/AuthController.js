import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/UserModel.js";

dotenv.config();

// ✅ REGISTER (Inscription)
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ LOGIN (Connexion)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ VERIFY TOKEN (Vérifier si le token est valide)
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      req.user = decoded; // Stocke les infos de l'utilisateur dans req.user
      next();
    });

  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ GET ME (Récupérer les infos de l'utilisateur connecté)
export const getMe = async (req, res) => {
  try {
    // `req.user` contient les infos décodées du JWT grâce à `verifyToken`
    const user = await UserModel.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "createdAt"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
