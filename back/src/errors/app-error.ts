export class AppError extends Error {
  public readonly httpCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(message: string, httpCode = 500, isOperational = true, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.details = details;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}


