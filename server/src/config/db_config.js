import mongoose from "mongoose";
import { Sequelize } from "sequelize"; // ✅ Import Sequelize
import dotenv from "dotenv";

dotenv.config();

// ✅ Création de l'instance Sequelize pour MySQL
export const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: "mysql",
        logging: false, // Désactiver les logs SQL
    }
);

// ✅ Fonction de connexion aux bases de données
export const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");

        // Connect to MySQL
        await sequelize.authenticate();
        console.log("✅ MySQL Connected");

        // Synchronisation des modèles Sequelize
        await sequelize.sync({ alter: true });
        console.log("✅ MySQL Tables Synced");
    } catch (error) {
        console.error("❌ Database Connection Error:", error);
        process.exit(1);
    }
};
