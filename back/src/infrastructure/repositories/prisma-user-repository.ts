import { prisma } from "../prisma/client";
import { UserRepository } from "../../domain/repositories/user-repository";
import { User } from "../../domain/entities/user";
import { Prisma } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {
  async list(search?: string): Promise<User[]> {
    const where: Prisma.UserWhereInput | undefined = search
      ? {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: search, mode: Prisma.QueryMode.insensitive } }
          ]
        }
      : undefined;
    return prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" }
    }) as unknown as User[];
  }

  async deleteById(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}


