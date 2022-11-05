import joi from "joi";

const configValidation = joi
    .object()
    .keys({
        SEQUELIZE_DB_HOST: joi.string().valid("localhost").required(),
        SEQUELIZE_DB_USERNAME: joi.string().required(),
        SEQUELIZE_DB_PASSWORD: joi.string().required(),
        SEQUELIZE_DB_DATABASE: joi.string().required(),
        APPLICATION_PORT: joi.number().required(),
        KAFKA_CLIENT_ID: joi.string().required(),
        KAFKA_TOPIC: joi.string().required(),
        KAFKA_GROUP_ID: joi.string().required(),
        KAFKA_BROKER_1: joi.string().required(),
    })
    .unknown();

const { error, value: envVariables } = configValidation
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
export const config = {
    SEQUELIZE_DB_HOST: envVariables.SEQUELIZE_DB_HOST,
    SEQUELIZE_DB_USERNAME: envVariables.SEQUELIZE_DB_USERNAME,
    SEQUELIZE_DB_PASSWORD: envVariables.SEQUELIZE_DB_PASSWORD,
    SEQUELIZE_DB_DATABASE: envVariables.SEQUELIZE_DB_DATABASE,
    APPLICATION_PORT: envVariables.APPLICATION_PORT,
    KAFKA_CLIENT_ID: envVariables.KAFKA_CLIENT_ID,
    KAFKA_TOPIC: envVariables.KAFKA_TOPIC,
    KAFKA_GROUP_ID: envVariables.KAFKA_GROUP_ID,
    KAFKA_BROKER_1: envVariables.KAFKA_BROKER_1,
};
