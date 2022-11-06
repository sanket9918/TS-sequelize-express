import { config } from "../../config/config.validator";
import Logger from "../../logger/winston";
import { kafka } from "../../util/kafka.connector";
import { sendMail } from "../../util/nodemailer";

const initiateKafkaConsumerEmail = async () => {
    const consumer = kafka.consumer({
        groupId: config.KAFKA_GROUP_ID_EMAIL as string,
    });
    await consumer.subscribe({
        topic: config.KAFKA_TOPIC_EMAIL as string,
        fromBeginning: true,
    });
    await consumer.connect();

    await consumer.run({
        eachMessage: async ({ message }) => {
            if (message.value) {
                const mailItems = JSON.parse(message.value.toString());
                sendMail(
                    mailItems.toMail,
                    mailItems.subject,
                    mailItems.message,
                ).catch((e) => Logger.error(e));
            }
        },
    });
};

export { initiateKafkaConsumerEmail };
