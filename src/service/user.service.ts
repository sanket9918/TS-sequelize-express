import { RequestHandler } from "express";
import { initiateProducerEmail } from "../kafka/email/kafka.email.producer";
import { initiateProducer } from "../kafka/kafka.producer";
import Logger from "../logger/winston";
import { Hobby } from "../models/Hobby";
import { User } from "../models/User";

export const getUsers: RequestHandler = async (req, res) => {
    const { page } = req.query;

    let pageQuery = page as unknown as number;

    if (pageQuery === 0) {
        pageQuery = 1;
    }
    const limit = 5;
    const skip = (pageQuery - 1) * limit;
    try {
        const users = await User.findAll({
            offset: skip,
            limit,
            include: [
                {
                    model: Hobby,
                },
            ],
        });
        Logger.info("Details of all users fetched");
        res.status(200).send(users);
    } catch (error) {
        Logger.error(error);
        res.status(500).send(error);
    }
};
export const getASingleUser: RequestHandler = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(500).send({ error: "Request body is empty" });
    }
    try {
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Hobby,
                },
            ],
        });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ error: "No such user found" });
        }
    } catch (error) {
        Logger.error(error);
        res.status(500).send(error);
    }
};

export const eventBasedCreateUser = async (newUser: User) => {
    try {
        const users = await User.create(newUser, {
            include: [
                {
                    model: Hobby,
                },
            ],
        });

        Logger.info("User created successfully using Kafka payload");
        if (users) {
            const mailPayload = {
                toMail: users.email,
                subject: `Welcome ${users.name} to my app`,
                message: `Hey ${users.name} We are so excited to welcome you to our journey`,
            };
            await initiateProducerEmail(mailPayload);
        }
    } catch (error) {
        Logger.error(error);
    }
};

export const createUser: RequestHandler = async (req, res) => {
    const newUser = req.body;
    if (!newUser) {
        res.status(500).send({ error: "Request body is empty" });
    }
    try {
        const users = await User.create(newUser, {
            include: [
                {
                    model: Hobby,
                },
            ],
        });
        if (users) {
            res.status(200).send({ message: "Create user successful" });

            const mailPayload = {
                toMail: users.email,
                subject: `Welcome ${users.name} to my app`,
                message: `Hey ${users.name} We are so excited to welcome you to our journey`,
            };
            await initiateProducerEmail(mailPayload);
        } else {
            res.status(400).send({ error: "User creation failed" });
        }
    } catch (error) {
        Logger.error(error);
        res.status(500).send(error);
    }
};

export const createUsingKafka: RequestHandler = async (req, res) => {
    const newReq = req.body;
    if (!newReq) {
        res.status(500).send({ error: "Request body is empty" });
    }

    try {
        await initiateProducer(newReq);
        res.status(200).send({ message: "Message sent" });
        // Logger.info(newInstance);
    } catch (error) {
        Logger.error(error);
    }
};

export const updateUser: RequestHandler = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(500).send({ error: "ID is empty" });
    }
    try {
        await User.update(req.body, {
            where: {
                id,
            },
        });

        res.status(200).send({ message: "User successfully updated " });
    } catch (error) {
        Logger.error(error);
        res.status(500).send(error);
    }
};

export const deleteUser: RequestHandler = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(500).send({ error: "ID is empty" });
    }
    try {
        const deleteUser = await User.destroy({
            where: {
                id,
            },
        });
        if (deleteUser < 1) {
            res.status(404).send({ error: "No such record found to delete" });
        } else {
            res.status(200).send({ message: "User successfully deleted " });
        }
    } catch (error) {
        Logger.error(error);
        res.status(500).send(error);
    }
};
