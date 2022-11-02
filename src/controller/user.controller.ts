import { Router } from "express";
import {
    createUser,
    deleteUser,
    getASingleUser,
    getUsers,
    updateUser,
} from "../service/user.service";

export const users = Router();

users.get("/", getUsers);
users.post("/", createUser);
users.get("/:id", getASingleUser);
users.put("/:id", updateUser);
users.delete("/:id", deleteUser);
