import { Router } from "express";
import { createUser, getASingleUser, getUsers } from "../service/user.service";

export const users = Router();

users.get("/", getUsers);
users.post("/", createUser);
users.get("/:id", getASingleUser);
