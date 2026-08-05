export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function generateUniqueSlug(base: string, suffix?: string): string {
  const slug = slugify(base);
  if (!suffix) return slug;
  return `${slug}-${suffix}`;
}

export function randomSlugSuffix(length = 6): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
}
