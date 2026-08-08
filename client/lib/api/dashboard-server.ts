// lib/api/dashboard-server.ts

import { cookies } from "next/headers";

const API_BASE = process.env.API_URL!;

export async function getDashboardSummary() {
  const cookieStore = await cookies();

  const res = await fetch(`${API_BASE}/api/v1/dashboard/summary`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }

  return res.json();
}
