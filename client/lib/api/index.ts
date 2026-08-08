import { api } from "./client";
import type { AnalyticsOverview, DashboardSummary } from "@/types";

export const dashboardApi = {
  summary: () => api.get<DashboardSummary>("/dashboard/summary"),
};

export const analyticsApi = {
  overview: (days = 30) =>
    api.get<AnalyticsOverview>(`/analytics/overview?days=${days}`),
  track: (payload: { eventType: string; path?: string; referrer?: string }) =>
    api.post<null>("/analytics/track", payload),
};

export const settingsApi = {
  get: (keys?: string) =>
    api.get<Record<string, unknown>>(
      keys ? `/settings?keys=${keys}` : "/settings",
    ),
  upsert: (key: string, value: unknown) =>
    api.put<null>("/settings", { key, value }),
  remove: (key: string) => api.delete<null>(`/settings/${key}`),
};
