import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER_1 as string],
});
