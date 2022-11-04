import { Partitioners } from "kafkajs";
import { User } from "../models/User";
import { kafka } from "../util/kafka.connector";

const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
});

async function initiateProducer(inputValue: User) {
    await producer.connect();
    await producer.send({
        topic: process.env.KAFKA_TOPIC as string,
        messages: [
            {
                value: JSON.stringify(inputValue),
            },
        ],
    });
    // await producer.disconnect();
}

export { initiateProducer };
