import { z } from 'zod';

export const createMessageSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(254),
  subject: z.string().max(200).optional(),
  body: z.string().min(5).max(5000),
});

export const messageQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  status: z.enum(['NEW', 'READ', 'REPLIED', 'ARCHIVED']).optional(),
  search: z.string().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const messageIdSchema = z.object({
  id: z.string().cuid(),
});

export const updateMessageSchema = z.object({
  status: z.enum(['NEW', 'READ', 'REPLIED', 'ARCHIVED']),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;
