import { Sequelize } from "sequelize-typescript";
import { Hobby } from "../models/Hobby";
import { User } from "../models/User";

const connection = new Sequelize({
    dialect: "postgres",
    host: process.env.SEQUELIZE_DB_HOST,
    username: process.env.SEQUELIZE_DB_USERNAME,
    password: process.env.SEQUELIZE_DB_PASSWORD,
    database: process.env.SEQUELIZE_DB_DATABASE,
    logging: false,
    models: [User, Hobby],
});

export default connection;
