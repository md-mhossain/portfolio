import type { Prisma } from "../../generated/prisma/client.js";
import { NotFoundError } from "../../shared/errors.js";
import {
  buildPaginationMeta,
  parseOrderBy,
  parsePagination,
} from "../../shared/utils/pagination.js";
import { sanitizeText } from "../../shared/utils/sanitize.js";
import { prisma } from "../../lib/prisma.js";
import type { CreateMessageInput } from "./messages.schemas.js";

const SORTABLE_FIELDS = ["createdAt", "updatedAt"];

function buildWhere(input: {
  search?: string;
  status?: string;
}): Prisma.MessageWhereInput {
  const where: Prisma.MessageWhereInput = {};

  if (input.status) {
    where.status = input.status as Prisma.MessageWhereInput["status"];
  }

  if (input.search) {
    where.OR = [
      { name: { contains: input.search, mode: "insensitive" } },
      { email: { contains: input.search, mode: "insensitive" } },
      { body: { contains: input.search, mode: "insensitive" } },
    ];
  }

  return where;
}

export const messagesService = {
  async list(input: {
    page?: number;
    limit?: number;
    search?: string;
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
      prisma.message.findMany({
        where,
        skip,
        take: limit,
        orderBy: orderBy as Prisma.MessageOrderByWithRelationInput,
      }),
      prisma.message.count({ where }),
    ]);

    return { items, meta: buildPaginationMeta(total, page, limit) };
  },

  async getById(id: string) {
    const message = await prisma.message.findUnique({ where: { id } });
    if (!message) throw new NotFoundError("Message not found.");
    return message;
  },

  async create(
    input: CreateMessageInput,
    meta: { ip?: string; userAgent?: string },
  ) {
    const body = sanitizeText(input.body);
    const name = sanitizeText(input.name, 120);
    const subject = input.subject
      ? sanitizeText(input.subject, 200)
      : undefined;

    return prisma.message.create({
      data: {
        name,
        email: input.email.trim().toLowerCase(),
        body,
        subject,
        ipAddress: meta.ip?.slice(0, 45),
        userAgent: meta.userAgent?.slice(0, 255),
      },
    });
  },

  async updateStatus(id: string, status: string) {
    const existing = await prisma.message.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Message not found.");

    const data: Prisma.MessageUpdateInput = {
      status: status as Prisma.MessageUpdateInput["status"],
    };
    if (status === "READ" && !existing.readAt) data.readAt = new Date();
    if (status === "REPLIED" && !existing.repliedAt)
      data.repliedAt = new Date();

    return prisma.message.update({ where: { id }, data });
  },

  async delete(id: string) {
    const existing = await prisma.message.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Message not found.");
    await prisma.message.delete({ where: { id } });
  },

  async getStats() {
    const [total, unread, read, replied, archived, recent] = await Promise.all([
      prisma.message.count(),
      prisma.message.count({ where: { status: "NEW" } }),
      prisma.message.count({ where: { status: "READ" } }),
      prisma.message.count({ where: { status: "REPLIED" } }),
      prisma.message.count({ where: { status: "ARCHIVED" } }),
      prisma.message.findMany({
        where: {},
        skip: 0,
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return { total, unread, read, replied, archived, recent };
  },
};
