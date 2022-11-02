import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { users } from "./src/controller/user.controller";
import connection from "./src/db/connection";

const app = express();

app.use(express.json());

app.use("/users", users);

const bootstrap = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(process.env.APPLICATION_PORT, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

bootstrap();
