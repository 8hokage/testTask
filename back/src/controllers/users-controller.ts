import { Request, Response } from "express";
import { getUsersQuerySchema, deleteUserParamsSchema } from "../validators/user.validator";
import { PrismaUserRepository } from "../infrastructure/repositories/prisma-user-repository";
import { ListUsers } from "../application/use-cases/list-users";
import { DeleteUser } from "../application/use-cases/delete-user";
import { ValidationError } from "../errors/http-errors";

export async function getUsers(req: Request, res: Response) {
  const parsed = getUsersQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw new ValidationError("Invalid query", parsed.error.flatten());
  }
  const repo = new PrismaUserRepository();
  const useCase = new ListUsers(repo);
  const users = await useCase.execute(parsed.data.search);
  return res.json({ data: users });
}

export async function deleteUser(req: Request, res: Response) {
  const parsed = deleteUserParamsSchema.safeParse(req.params);
  if (!parsed.success) {
    throw new ValidationError("Invalid params", parsed.error.flatten());
  }
  const repo = new PrismaUserRepository();
  const useCase = new DeleteUser(repo);
  await useCase.execute(parsed.data.id);
  return res.status(204).send();
}


