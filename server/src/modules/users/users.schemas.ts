import { z } from "zod";

export const userQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().max(100).optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    bio: z.string().max(500).optional(),
    avatarUrl: z.string().url().optional().nullable(),
    role: z.enum(["ADMIN", "USER"]).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data: Record<string, unknown>) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });

export const userIdSchema = z.object({
  id: z.string().cuid(),
});

export const updateProfileSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    bio: z.string().max(500).optional(),
    avatarUrl: z.string().url().optional().nullable(),
  })
  .refine((data: Record<string, unknown>) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });
