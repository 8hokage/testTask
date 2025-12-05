import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { prisma } from "../infrastructure/prisma/client";

export async function seedIfEmpty() {
  const count = await prisma.user.count();
  if (count > 0) return;

  await createSampleUsers(prisma, 12);
  console.log("Seeded database with sample users");
}

export async function createSampleUsers(prisma: PrismaClient, total: number) {
  const users = Array.from({ length: total }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city()
  }));

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true
  });
}



