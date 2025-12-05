import { AppError } from "./app-error";

export class BadRequestError extends AppError {
  constructor(message = "Bad Request", details?: unknown) {
    super(message, 400, true, details);
  }
}

export class ValidationError extends BadRequestError {
  constructor(message = "Validation Error", details?: unknown) {
    super(message, details);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found", details?: unknown) {
    super(message, 404, true, details);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal Server Error", details?: unknown) {
    super(message, 500, false, details);
  }
}


