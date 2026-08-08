import { AnalyticsClient } from "@/components/admin/analytics/analytics.client";
import { serverFetch } from "@/lib/api/server";

import { ApiResponse } from "@/types";

export default async function AdminPage() {
  const response: ApiResponse<any> = await serverFetch("/dashboard/summary");

  return <AnalyticsClient summary={response?.data} />;
}
