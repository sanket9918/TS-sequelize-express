import { Partitioners } from "kafkajs";
import { config } from "../../config/config.validator";
import { kafka } from "../../util/kafka.connector";

const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
});

interface IEMailInput {
    toMail: string;
    subject: string;
    message: string;
}

async function initiateProducerEmail(inputValue: IEMailInput) {
    await producer.connect();
    await producer.send({
        topic: config.KAFKA_TOPIC_EMAIL as string,
        messages: [
            {
                value: JSON.stringify(inputValue),
            },
        ],
    });
    // await producer.disconnect();
}

export { initiateProducerEmail };
