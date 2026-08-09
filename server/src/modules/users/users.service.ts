import { Prisma } from "../../generated/prisma/client.js"
import { NotFoundError, BadRequestError } from "../../shared/errors.js";
import {
  buildPaginationMeta,
  parseOrderBy,
  parsePagination,
} from "../../shared/utils/pagination.js";
import { prisma } from "../../lib/prisma.js";

const SORTABLE_FIELDS = [
  "createdAt",
  "updatedAt",
  "lastLoginAt",
  "name",
  "email",
];
const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  avatarUrl: true,
  bio: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
  _count: { select: { blogs: true } },
} satisfies Prisma.UserSelect;

function buildWhere(input: {
  search?: string;
  role?: string;
  status?: string;
}): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = {};

  if (input.search) {
    const query = input.search.trim();
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
    ];
  }

  if (input.role) {
    where.role = input.role as Prisma.UserWhereInput["role"];
  }

  if (input.status === "active") where.isActive = true;
  if (input.status === "inactive") where.isActive = false;

  return where;
}

export const usersService = {
  async list(input: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const { page, limit, skip } = parsePagination(input);
    const where = buildWhere(input);
    const orderBy = parseOrderBy(
      input.sortBy,
      input.sortOrder,
      SORTABLE_FIELDS,
    );

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: orderBy as Prisma.UserOrderByWithRelationInput,
        select: safeUserSelect,
      }),
      prisma.user.count({ where }),
    ]);

    return { items, meta: buildPaginationMeta(total, page, limit) };
  },

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: safeUserSelect,
    });
    if (!user) throw new NotFoundError("User not found.");
    return user;
  },

  async update(id: string, data: Record<string, unknown>) {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("User not found.");

    if (data.isActive === false && existing.role === "ADMIN") {
      throw new BadRequestError(
        "You cannot deactivate an administrator account.",
      );
    }

    return prisma.user.update({
      where: { id },
      data: data as Prisma.UserUpdateInput,
      select: safeUserSelect,
    });
  },

  async updateProfile(
    userId: string,
    data: { name?: string; bio?: string; avatarUrl?: string | null },
  ) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError("User not found.");

    const updateData: Prisma.UserUpdateInput = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.avatarUrl !== undefined) updateData.avatarUrl = data.avatarUrl;

    return prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: safeUserSelect,
    });
  },

  async delete(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("User not found.");
    if (user.role === "ADMIN") {
      throw new BadRequestError("Administrator accounts cannot be deleted.");
    }
    await prisma.user.delete({ where: { id } });
  },

  async getStats() {
    const [total, active, admins] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
    ]);
    return { total, active, inactive: total - active, admins };
  },
};
