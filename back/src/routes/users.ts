import { Router } from "express";
import { getUsers, deleteUser } from "../controllers/users-controller";

export const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.delete("/:id", deleteUser);

