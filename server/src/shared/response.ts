import type {Response} from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ApiSuccessOptions {
  statusCode?: number;
  message?: string;
  meta?: PaginationMeta | Record<string, unknown>;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  options: ApiSuccessOptions = {},
) {
  const { statusCode = 200, message, meta } = options;
  const body: Record<string, unknown> = {
    success: true,
    data,
  };
  if (message) body.message = message;
  if (meta) body.meta = meta;

  return res.status(statusCode).json(body);
}

export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  code = 'INTERNAL_ERROR',
  details?: unknown,
) {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
  });
}
