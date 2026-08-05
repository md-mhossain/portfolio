type QueryParamValue = string | number | boolean | undefined | null;

export function buildQuery(path: string, params: object): string {
  const search = new URLSearchParams();
  Object.entries(params as Record<string, QueryParamValue>).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `${path}?${qs}` : path;
}
