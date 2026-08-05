import { z } from 'zod';

const jsonValue: z.ZodType<unknown> = z.any();

export const upsertSettingSchema = z.object({
  key: z.string().min(1).max(100),
  value: jsonValue,
});

export const settingKeysSchema = z.object({
  keys: z.string().optional(),
});
