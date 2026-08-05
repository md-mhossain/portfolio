'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { analyticsApi } from '@/lib/api/index';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@/lib/utils';

export function TrafficChart({ days = 30 }: { days?: number }) {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics', 'overview', days],
    queryFn: () => analyticsApi.overview(days),
  });

  const timeline = data?.data?.timeline ?? [];
  const max = Math.max(1, ...timeline.map((t) => t.total));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page views</CardTitle>
        <CardDescription>Last {days} days</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : timeline.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            No traffic data yet.
          </div>
        ) : (
          <div className="flex h-48 items-end gap-1">
            {timeline.map((point) => (
              <div
                key={point.date}
                className="group relative flex-1 rounded-t bg-gradient-to-t from-teal-400 to-lime-500 transition-all hover:opacity-80"
                style={{ height: `${Math.max(4, (point.total / max) * 100)}%` }}
                title={`${formatDate(point.date)}: ${point.total} views`}
              >
                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
                  {point.total}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
