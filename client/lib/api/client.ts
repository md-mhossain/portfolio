import type { ApiError, ApiResponse } from "@/types";
import { useAuthStore } from "@/lib/auth/store";

export class ApiClientError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(
    status: number,
    code: string,
    message: string,
    details?: unknown,
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  revalidate?: number;
}

// Global variables for queue and refresh management
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    body,
    headers = {},
    credentials = "include",
    revalidate,
  } = options;

  // Automatically attach Bearer token from Zustand store if available
  const accessToken = useAuthStore.getState().accessToken;

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    credentials,
    body: isFormData
      ? (body as FormData)
      : body
        ? JSON.stringify(body)
        : undefined,
    ...(revalidate ? { next: { revalidate } } : {}),
  };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/v1${path}`, fetchOptions);
  } catch (error) {
    throw new ApiClientError(
      0,
      "NETWORK_ERROR",
      "Unable to reach the server. Check your connection.",
    );
  }

  // Handle Token Expiration and Auto-Refresh (401 Unauthorized)

  const hasToken = useAuthStore.getState().accessToken;
  if (res.status === 401 && !path.includes("/auth/") && hasToken) {
    if (isRefreshing) {
      try {
        const newToken = await new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });

        if (newToken) {
          // Retry the original request with the new token
          const retryHeaders = {
            ...fetchOptions.headers,
            Authorization: `Bearer ${newToken}`,
          };
          const retryRes = await fetch(`${API_BASE}/api/v1${path}`, {
            ...fetchOptions,
            headers: retryHeaders,
          });

          const retryContentType = retryRes.headers.get("content-type") ?? "";
          const retryPayload = retryContentType.includes("application/json")
            ? ((await retryRes.json()) as ApiResponse<T> | ApiError)
            : null;

          if (!retryRes.ok) {
            const errPayload = retryPayload as ApiError | null;
            throw new ApiClientError(
              retryRes.status,
              errPayload?.error?.code ?? "UNKNOWN_ERROR",
              errPayload?.error?.message ??
                `Request failed with status ${retryRes.status}`,
              errPayload?.error?.details,
            );
          }
          return retryPayload as ApiResponse<T>;
        }
      } catch (queueError) {
        throw queueError;
      }
    }

    isRefreshing = true;

    try {
      // Attempt to get a new access token via refresh route
      const refreshRes = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!refreshRes.ok) {
        throw new Error("Refresh token expired");
      }

      const refreshData = await refreshRes.json();
      const newAccessToken =
        refreshData.data?.accessToken || refreshData.accessToken;

      // Update Zustand store with the new access token
      useAuthStore.getState().setAccessToken(newAccessToken);

      isRefreshing = false;
      processQueue(null, newAccessToken);

      // Retry original request with new access token
      const newHeaders = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      const retryRes = await fetch(`${API_BASE}/api/v1${path}`, {
        ...fetchOptions,
        headers: newHeaders,
      });

      const contentType = retryRes.headers.get("content-type") ?? "";
      const payload = contentType.includes("application/json")
        ? ((await retryRes.json()) as ApiResponse<T> | ApiError)
        : null;

      if (!retryRes.ok) {
        const errorPayload = payload as ApiError | null;
        throw new ApiClientError(
          retryRes.status,
          errorPayload?.error?.code ?? "UNKNOWN_ERROR",
          errorPayload?.error?.message ??
            `Request failed with status ${retryRes.status}`,
          errorPayload?.error?.details,
        );
      }

      return payload as ApiResponse<T>;
    } catch (refreshError) {
      isRefreshing = false;
      processQueue(refreshError, null);

      // Clear auth state and force logout if refresh fails
      useAuthStore.getState().reset();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      throw new ApiClientError(
        401,
        "UNAUTHORIZED",
        "Session expired. Please log in again.",
      );
    }
  }

  const contentType = res.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? ((await res.json()) as ApiResponse<T> | ApiError)
    : null;

  if (!res.ok) {
    const errorPayload = payload as ApiError | null;
    throw new ApiClientError(
      res.status,
      errorPayload?.error?.code ?? "UNKNOWN_ERROR",
      errorPayload?.error?.message ??
        `Request failed with status ${res.status}`,
      errorPayload?.error?.details,
    );
  }

  return payload as ApiResponse<T>;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiClientError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}
