import { Prisma } from "../../generated/prisma/client";

import { prisma } from "../../lib/prisma.js";
import type { TrackEventInput } from "./analytics.types.js";

export const analyticsService = {
  async track(
    input: TrackEventInput,
    meta: { ip?: string | undefined; userAgent?: string | undefined },
  ) {
    return prisma.analyticsEvent.create({
      data: {
        eventType: input.eventType,

        ...(input.path && {
          path: input.path.slice(0, 500),
        }),

        ...(input.referrer && {
          referrer: input.referrer.slice(0, 1000),
        }),

        ...(meta.ip && {
          ipAddress: meta.ip.slice(0, 45),
        }),

        ...(meta.userAgent && {
          userAgent: meta.userAgent.slice(0, 255),
        }),

        ...(input.metadata && {
          metadata: input.metadata as Prisma.InputJsonValue,
        }),
      },
    });
  },

  async overview(days = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [total, visits, pageviews, timeline] = await Promise.all([
      prisma.analyticsEvent.count(),
      prisma.analyticsEvent.count({
        where: { eventType: "pageview", createdAt: { gte: since } },
      }),
      prisma.analyticsEvent.count({ where: { eventType: "pageview" } }),
      this.groupByDay({ eventType: "pageview" }, days),
    ]);

    const topPaths = await this.topPaths({ eventType: "pageview" });

    return { total, visits, pageviews, timeline, topPaths };
  },

  async countEvents(where: Prisma.AnalyticsEventWhereInput = {}) {
    return prisma.analyticsEvent.count({ where });
  },

  async groupByDay(where: Prisma.AnalyticsEventWhereInput, days: number) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const events = await prisma.analyticsEvent.findMany({
      where: { ...where, createdAt: { gte: since } },
      select: { createdAt: true, eventType: true },
      orderBy: { createdAt: "asc" },
    });

    const dayMap = new Map<string, { date: string; total: number }>();
    for (let i = days - 1; i >= 0; i -= 1) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const key = date.toISOString().slice(0, 10);
      dayMap.set(key, { date: key, total: 0 });
    }

    for (const event of events) {
      const key = event.createdAt.toISOString().slice(0, 10);
      const entry = dayMap.get(key);
      if (entry) entry.total += 1;
    }

    return Array.from(dayMap.values());
  },

  async topPaths(where: Prisma.AnalyticsEventWhereInput, limit = 5) {
    const events = await prisma.analyticsEvent.findMany({
      where,
      select: { path: true },
    });
    const pathMap = new Map<string, number>();
    for (const event of events) {
      const path = event.path ?? "/";
      pathMap.set(path, (pathMap.get(path) ?? 0) + 1);
    }
    return Array.from(pathMap, ([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  },
};
