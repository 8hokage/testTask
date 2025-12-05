import type express from "express";
import { ZodError } from "zod";
import { ValidationError } from "../errors/http-errors";

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

    return res.status(500).json({ error: "InternalServerError", message: "Internal Server Error" });
}


