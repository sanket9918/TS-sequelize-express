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
    if (user) {
      res.status(200).send(user);
    }
    res.status(404).send({ error: "No such user found" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const createUser: RequestHandler = async (req, res) => {
  const newUser = req.body;
  if (!newUser) {
    res.status(500).send({ error: "Request body is empty" });
  }
  try {
    const users = await User.create(newUser);
    if (users) {
      res.status(200).send({ message: "Create user successful" });
    } else {
      res.status(400).send({ error: "User creation failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).send(error);
  }
};
