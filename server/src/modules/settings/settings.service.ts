import {Prisma} from "../../generated/prisma/client.js"

import { prisma } from "../../lib/prisma.js";

export const settingsService = {
  async get(keys?: string) {
    const keyList = keys
      ? keys
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : undefined;
    const rows = await prisma.appSetting.findMany({
      ...(keyList ? { where: { key: { in: keyList } } } : {}),
    });
    const result: Record<string, unknown> = {};
    for (const row of rows) {
      result[row.key] = row.value;
    }
    return result;
  },

  async upsert(key: string, value: Record<string, unknown>) {
    return prisma.appSetting.upsert({
      where: { key },
      create: { key, value: value as Prisma.InputJsonValue },
      update: { value: value as Prisma.InputJsonValue },
    });
  },

  async remove(key: string) {
    return prisma.appSetting.delete({ where: { key } });
  },
};
