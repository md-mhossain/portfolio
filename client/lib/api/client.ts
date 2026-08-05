import type { ApiError, ApiResponse } from '@/types';

export class ApiClientError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  revalidate?: number;
}

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    body,
    headers = {},
    credentials = 'include',
    revalidate,
  } = options;

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    credentials,
    body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
    ...(revalidate ? { next: { revalidate } } : {}),
  };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/v1${path}`, fetchOptions);
  } catch (error) {
    throw new ApiClientError(0, 'NETWORK_ERROR', 'Unable to reach the server. Check your connection.');
  }

  const contentType = res.headers.get('content-type') ?? '';
  const payload = contentType.includes('application/json')
    ? ((await res.json()) as ApiResponse<T> | ApiError)
    : null;

  if (!res.ok) {
    const errorPayload = payload as ApiError | null;
    throw new ApiClientError(
      res.status,
      errorPayload?.error?.code ?? 'UNKNOWN_ERROR',
      errorPayload?.error?.message ?? `Request failed with status ${res.status}`,
      errorPayload?.error?.details,
    );
  }

  return payload as ApiResponse<T>;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiClientError) return error.message;
  if (error instanceof Error) return error.message;
  return 'Something went wrong. Please try again.';
}
