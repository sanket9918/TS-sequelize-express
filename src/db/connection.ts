import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";

const connection = new Sequelize({
  dialect: "postgres",
  host: process.env.SEQUELIZE_DB_HOST,
  username: process.env.SEQUELIZE_DB_USERNAME,
  password: process.env.SEQUELIZE_DB_PASSWORD,
  database: process.env.SEQUELIZE_DB_DATABASE,
  logging: false,
  models: [User],
});

export default connection;
