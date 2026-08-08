import type { Prisma } from "../../generated/prisma/client.js";
import { NotFoundError } from "../../shared/errors.js";
import {
  buildPaginationMeta,
  parseOrderBy,
  parsePagination,
} from "../../shared/utils/pagination.js";
import { slugify } from "../../shared/utils/slugify.js";
import { prisma } from "../../lib/prisma.js";
import type { CreateSkillInput, UpdateSkillInput } from "./skills.schemas.js";

const SORTABLE_FIELDS = ["order", "name", "proficiency", "createdAt"];

function buildWhere(input: {
  search?: string;
  category?: string;
}): Prisma.SkillWhereInput {
  const where: Prisma.SkillWhereInput = { isActive: true };

  if (input.category) {
    where.category = input.category as Prisma.SkillWhereInput["category"];
  }

  if (input.search) {
    where.OR = [{ name: { contains: input.search, mode: "insensitive" } }];
  }

  return where;
}

export const skillsService = {
  async list(input: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: string;
    includeInactive?: boolean;
  }) {
    const { page, limit, skip } = parsePagination(input);
    const where = input.includeInactive ? {} : buildWhere(input);
    const orderBy = parseOrderBy(
      input.sortBy,
      input.sortOrder,
      SORTABLE_FIELDS,
    );

    const [items, total] = await Promise.all([
      prisma.skill.findMany({
        where,
        skip,
        take: limit,
        orderBy: orderBy as Prisma.SkillOrderByWithRelationInput,
      }),
      prisma.skill.count({ where }),
    ]);

    return { items, meta: buildPaginationMeta(total, page, limit) };
  },

  async getById(id: string) {
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new NotFoundError("Skill not found.");
    return skill;
  },

  async create(input: CreateSkillInput) {
    return prisma.skill.create({
      data: { ...input, slug: slugify(input.name) },
    });
  },

  async update(id: string, input: UpdateSkillInput) {
    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Skill not found.");

    const data: Prisma.SkillUpdateInput = { ...input };
    if (input.name) data.slug = slugify(input.name);

    return prisma.skill.update({ where: { id }, data });
  },

  async delete(id: string) {
    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Skill not found.");
    await prisma.skill.delete({ where: { id } });
  },
};
