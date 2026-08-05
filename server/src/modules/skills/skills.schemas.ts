import { z } from 'zod';

export const createSkillSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(5).max(1000),
  iconUrl: z.string().url(),
  category: z
    .enum(['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'TOOLS', 'OTHER'])
    .default('OTHER'),
  proficiency: z.number().int().min(0).max(100).default(80),
  order: z.number().int().default(0),
});

export const updateSkillSchema = createSkillSchema.partial();

export const skillQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().max(100).optional(),
  category: z.enum(['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'TOOLS', 'OTHER']).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const skillIdSchema = z.object({
  id: z.string().cuid(),
});

export type CreateSkillInput = z.infer<typeof createSkillSchema>;
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;
