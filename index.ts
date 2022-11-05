import * as dotenv from "dotenv";
dotenv.config();
import compression from "compression";
import express from "express";
import { users } from "./src/controller/user.controller";
import connection from "./src/db/connection";
import morganMiddleware from "./src/logger/morgan";
import Logger from "./src/logger/winston";
import { config } from "./src/config/config.validator";
const app = express();
app.use(compression);

app.use(express.json());
app.use(morganMiddleware);

app.use("/users", users);

const bootstrap = async (): Promise<void> => {
    try {
        await connection.sync();
        Logger.info(config);
        app.listen(process.env.APPLICATION_PORT, () => {
            Logger.info("Server started on port 3000");
        });
    } catch (error) {
        Logger.error(error);
        process.exit(1);
    }
};

bootstrap();
