import { DataTypes } from "sequelize";
import { sequelize } from "../config/db_config.js";

const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // ✅ Garder UNIQUE, mais ne pas recréer plusieurs fois
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // ✅ Même chose pour l'email
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default UserModel;
