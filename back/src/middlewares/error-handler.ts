import type express from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../errors/app-error";
import { ValidationError, NotFoundError } from "../errors/http-errors";

export function errorHandler(
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
) {
    if (err instanceof ZodError) {
        const vErr = new ValidationError("Validation Error", err.flatten());
        return res.status(vErr.httpCode).json({ error: vErr.name, message: vErr.message, details: vErr.details });
    }

    if (err instanceof AppError) {
        return res.status(err.httpCode).json({
            error: err.name,
            message: err.message,
            ...(err.details ? { details: err.details } : {})
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            const notFound = new NotFoundError("Resource not found");
            return res.status(notFound.httpCode).json({ error: notFound.name, message: notFound.message });
        }
        if (err.code === "P2002") {
            return res.status(409).json({ error: "ConflictError", message: "Unique constraint violation" });
        }
    }

    if (err instanceof Prisma.PrismaClientInitializationError) {
        return res.status(503).json({ error: "ServiceUnavailable", message: "Database unavailable" });
    }

    return res.status(500).json({ error: "InternalServerError", message: "Internal Server Error" });
}


