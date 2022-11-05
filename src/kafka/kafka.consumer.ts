import { config } from "../config/config.validator";
import Logger from "../logger/winston";
import { eventBasedCreateUser } from "../service/user.service";
import { kafka } from "../util/kafka.connector";

const initiateKafkaConsumer = async () => {
    const consumer = kafka.consumer({
        groupId: config.KAFKA_GROUP_ID as string,
    });
    await consumer.subscribe({
        topic: config.KAFKA_TOPIC as string,
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
};

export { initiateKafkaConsumer };
