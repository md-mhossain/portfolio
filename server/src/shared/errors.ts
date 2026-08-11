import { Prisma } from "../generated/prisma/client.js";

export type ErrorType =
    | "VALIDATION_ERROR"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "CONFLICT"
    | "TOO_MANY_REQUESTS"
    | "INTERNAL_ERROR"
    | "BAD_REQUEST";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly type: ErrorType;
  public readonly details?: unknown;
  public readonly isOperational: boolean;

  constructor(
      statusCode: number,
      type: ErrorType,
      message: string,
      details?: unknown,
      isOperational = true,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.type = type;
    this.details = details;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", details?: unknown) {
    super(400, "BAD_REQUEST", message, details);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", details?: unknown) {
    super(400, "VALIDATION_ERROR", message, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required") {
    super(401, "UNAUTHORIZED", message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(403, "FORBIDDEN", message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(404, "NOT_FOUND", message);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource already exists", details?: unknown) {
    super(409, "CONFLICT", message, details);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests, please try again later") {
    super(429, "TOO_MANY_REQUESTS", message);
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Maps unknown thrown values (including Prisma errors) into an AppError.
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (
      error &&
      typeof error === "object" &&
      "code" in error
  ) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;

    if (prismaError.code === "P2002") {
      const target = (
          prismaError.meta?.target as string[] | undefined
      )?.join(", ");

      return new ConflictError(
          `A record with this value already exists${
              target ? ` (${target})` : ""
          }.`,
      );
    }

    if (prismaError.code === "P2025") {
      return new NotFoundError("Record not found.");
    }

    if (prismaError.code === "P2003") {
      return new BadRequestError(
          "Operation violates a foreign key constraint.",
      );
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new BadRequestError(
        "Invalid data provided to the database.",
    );
  }

  return new AppError(
      500,
      "INTERNAL_ERROR",
      "Internal server error",
      undefined,
      false,
  );
}