import { dashboardApi } from "@/lib/api";
import { AnalyticsClient } from "@/components/admin/analytics/analytics.client";

export default async function AdminPage() {
  const response = await dashboardApi.summary();

  return <AnalyticsClient summary={response.data} />;
}
