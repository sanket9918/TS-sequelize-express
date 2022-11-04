import { Partitioners } from "kafkajs";
import { kafka } from "../util/kafka.connector";

interface IInputValue {
    name: string;
    age: number;
}
const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
});

async function initiateProducer(inputValue: IInputValue) {
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
