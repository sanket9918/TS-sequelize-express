import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config.validator";
import { Hobby } from "../models/Hobby";
import { User } from "../models/User";

const connection = new Sequelize({
    dialect: "postgres",
    host: config.SEQUELIZE_DB_HOST,
    username: config.SEQUELIZE_DB_USERNAME,
    password: config.SEQUELIZE_DB_PASSWORD,
    database: config.SEQUELIZE_DB_DATABASE,
    logging: false,
    models: [User, Hobby],
});

export default connection;
