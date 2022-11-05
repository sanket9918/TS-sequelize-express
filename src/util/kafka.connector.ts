import { Kafka } from "kafkajs";
import { config } from "../config/config.validator";

export const kafka = new Kafka({
    clientId: config.KAFKA_CLIENT_ID,
    brokers: [config.KAFKA_BROKER_1 as string],
});
