import "express-async-errors";
import express from "express";
import cors from "cors";
import { usersRouter } from "../../routes/users";
import { errorHandler } from "../../middlewares/error-handler";

export function buildApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/users", usersRouter);

  app.use(errorHandler);

  return app;
}



