import { RequestHandler } from "express";
import { User } from "../models/User";

export const getUsers: RequestHandler = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).send(users);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};
export const getASingleUser: RequestHandler = async (req, res) => {
	const id = req.params.id;
	if (!id) {
		res.status(500).send({ error: "Request body is empty" });
	}
	try {
		const user = await User.findByPk(id);
		if (!user) {
			res.status(404).send({ error: "No such user found" });
		}
		res.status(200).send(user);
	} catch (error) {
		console.error(error);
	}
};

export const createUser: RequestHandler = async (req, res) => {
	const newUser = req.body;
	if (!newUser) {
		res.status(500).send({ error: "Request body is empty" });
	}
	try {
		const users = await User.create(newUser);
		if (!users) {
			res.status(400).send({ error: "User creation failed" });
		}
		res.status(200).send({ message: "Create user successful" });
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};
