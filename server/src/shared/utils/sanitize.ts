/**
 * Lightweight input sanitization helpers.
 * Backend should always rely on parameterized queries (Prisma) to prevent
 * SQL injection, but these helpers provide defense-in-depth for
 * user-supplied text.
 */

export function stripHtml(input: string): string {
  return input
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

export function sanitizeText(input: unknown, maxLength = 5000): string {
  if (typeof input !== 'string') return '';
  return stripHtml(input).slice(0, maxLength);
}

export function sanitizeEmail(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input.trim().toLowerCase().slice(0, 254);
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = sanitizeText(value);
    } else {
      result[key] = value;
    }
  }
  return result as T;
}
