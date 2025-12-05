import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { buildApp } from "./app";
import { seedIfEmpty } from "./seed/seed";
import { prisma } from "./infrastructure/prisma/client";

async function start() {
  const app = buildApp();
  const port = Number(process.env.PORT ?? "3001");
  
  app.listen(port, "0.0.0.0", async () => {
    console.log(`Server listening on ${port}`);
    await prisma.$connect();
    await seedIfEmpty();
  });
}

start();


