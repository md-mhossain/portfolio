import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./shared/logger";
import { prisma } from "./lib/prisma";

const app = createApp();

// Vercel-এর জন্য সার্ভারলেস হ্যান্ডলার হিসেবে অ্যাপ এক্সপোর্ট করা জরুরি
export default app;

// লোকাল ডেভেলপমেন্ট বা নিজস্ব সার্ভারে (VPS/Render ইত্যাদি) চালানোর জন্য
if (env.NODE_ENV !== "production" || process.env.RUN_LOCAL === "true") {
  async function bootstrap() {
    try {
      await prisma.$connect();
      logger.info("Database connection established.");
    } catch (error) {
      logger.error({ err: error }, "Failed to connect to the database.");
      process.exit(1);
    }

    const server = app.listen(env.PORT, () => {
      logger.info(
          `API server listening on http://localhost:${env.PORT}${env.API_PREFIX} (${env.NODE_ENV})`,
      );
    });

    const shutdown = async (signal: string) => {
      logger.info(`${signal} received - shutting down gracefully.`);
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
      setTimeout(() => process.exit(1), 10_000).unref();
    };

    process.on("SIGTERM", () => void shutdown("SIGTERM"));
    process.on("SIGINT", () => void shutdown("SIGINT"));
  }

  bootstrap().catch((err) => {
    logger.error({ err }, "Bootstrap failed.");
    process.exit(1);
  });
}