import pino from 'pino';
import { env, isProduction } from "../config/env.js";

export const logger = pino({
    level: env.NODE_ENV === 'test' ? 'silent' : 'info',
    ...(isProduction
        ? {}
        : {
            transport: {
                target: 'pino-pretty',
                options: { colorize: true, translateTime: 'SYS:standard', ignore: 'pid,hostname' },
            },
        }),
    base: { service: 'dev-monir-api' },
} as any);
