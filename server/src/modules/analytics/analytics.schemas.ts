import { z } from "zod";

export const trackEventSchema = z.object({
  eventType: z.string().min(1).max(100),
  path: z.string().max(500).optional(),
  referrer: z.string().max(1000).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const analyticsQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(90).default(30),
});
