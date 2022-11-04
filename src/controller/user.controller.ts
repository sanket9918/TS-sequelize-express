import { Router } from "express";
import {
    createUser,
    createUsingKafka,
    deleteUser,
    getASingleUser,
    getUsers,
    updateUser,
} from "../service/user.service";

export const users = Router();

users.get("/", getUsers);
users.post("/", createUser);
users.get("/profile/:id", getASingleUser);
users.put("/:id", updateUser);
users.delete("/:id", deleteUser);

// Kafka related routes

users.post("/produce", createUsingKafka);
