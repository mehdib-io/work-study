import { DataTypes } from "sequelize";
import { sequelize } from "../config/db_config.js";
import UserModel from "./UserModel.js";

const JobModel = sequelize.define("Job", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    postedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: "id",
        },
    },
});

export default JobModel;
