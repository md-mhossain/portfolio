import { Prisma } from "../../../generated/prisma/client";

export interface PaginationQuery {
  page: number;
  limit: number;
  skip: number;
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

export function parsePagination(
  query: Record<string, unknown>,
): PaginationQuery {
  const rawPage = Number(query.page ?? DEFAULT_PAGE);
  const rawLimit = Number(query.limit ?? DEFAULT_LIMIT);

  const page =
    Number.isInteger(rawPage) && rawPage > 0 ? rawPage : DEFAULT_PAGE;
  const limit =
    Number.isInteger(rawLimit) && rawLimit > 0 && rawLimit <= MAX_LIMIT
      ? rawLimit
      : DEFAULT_LIMIT;

  return { page, limit, skip: (page - 1) * limit };
}

export function buildPaginationMeta(
  totalItems: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.ceil(totalItems / limit) || 1;
  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

export function parseOrderBy(
  sortBy?: string,
  sortOrder?: string,
  allowedFields: string[] = ["createdAt", "updatedAt"],
): Prisma.SortOrder | Record<string, Prisma.SortOrder> {
  const field = allowedFields.includes(sortBy ?? "")
    ? (sortBy as string)
    : "createdAt";
  const order: Prisma.SortOrder = sortOrder === "asc" ? "asc" : "desc";
  return { [field]: order };
}
