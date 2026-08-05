"use client";

import { useAuthStore } from "@/lib/auth/store";
import { StatsGrid } from "./stats.grid";
// import { TrafficChart } from "./traffic.chart";
import { RecentMessages } from "./recent.messages";
import { RecentBlogs } from "./recent.blogs";

interface Props {
  summary: any;
}

export function AnalyticsClient({ summary }: Props) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Overview</h1>

        <p className="mt-1 text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      <StatsGrid summary={summary} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* <div className="lg:col-span-2">
          <TrafficChart />
        </div> */}

        <RecentMessages messages={summary.recentMessages} />
      </div>

      <RecentBlogs blogs={summary.recentBlogs} />
    </div>
  );
}
