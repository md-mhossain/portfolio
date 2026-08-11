import { AnalyticsClient } from "@/components/admin/analytics/analytics.client";

import { ApiResponse } from "@/types";
import {serverFetch} from "@/app/actions";

export default async function AdminPage() {

  const response: ApiResponse<any> = await serverFetch("/dashboard/summary");

  return <AnalyticsClient summary={response?.data} />;
}
