import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { users } from "./src/controller/user.controller";
import connection from "./src/db/connection";
import morganMiddleware from "./src/logger/morgan";
import Logger from "./src/logger/winston";
import { eventBasedCreateUser } from "./src/service/user.service";
import { kafka } from "./src/util/kafka.connector";

const app = express();

app.use(express.json());
app.use(morganMiddleware);

app.use("/users", users);

const bootstrap = async (): Promise<void> => {
    try {
        await connection.sync();

        const consumer = kafka.consumer({
            groupId: process.env.KAFKA_GROUP_ID as string,
        });
        await consumer.subscribe({
            topic: process.env.KAFKA_TOPIC as string,
            fromBeginning: true,
        });
        await consumer.connect();

        await consumer.run({
            eachMessage: async ({ message }) => {
                if (message.value) {
                    eventBasedCreateUser(
                        JSON.parse(message.value.toString()),
                    ).catch((e) => Logger.error(e));
                }
            },
        });

        app.listen(process.env.APPLICATION_PORT, () => {
            Logger.info("Server started on port 3000");
        });
    } catch (error) {
        Logger.error(error);
        process.exit(1);
    }
};

bootstrap();
