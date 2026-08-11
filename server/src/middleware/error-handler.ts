import type {NextFunction, Request, Response} from 'express';
import { randomUUID } from 'crypto';
import { logger } from "../shared/logger.js";
import { toAppError } from "../shared/errors.js";
import { sendError } from "../shared/response.js";

export function requestId(req: Request, res: Response, next: NextFunction) {
  req.requestId = randomUUID();
  res.setHeader('X-Request-Id', req.requestId);
  next();
}

export function notFoundHandler(req: Request, res: Response) {
  sendError(res, 404, `Route ${req.method} ${req.originalUrl} not found`, 'NOT_FOUND');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction) {
  const appError = toAppError(error);

  if (!appError.isOperational) {
    logger.error(
      { err: error, requestId: req.requestId, path: req.originalUrl },
      'Unhandled error',
    );
  } else {
    logger.warn({
      requestId: req.requestId,
      type: appError.type,
      message: appError.message,
      path: req.originalUrl,
      statusCode: appError.statusCode,
    });
  }

  sendError(
    res,
    appError.statusCode,
    appError.message,
    appError.type,
    appError.details,
  );
}
