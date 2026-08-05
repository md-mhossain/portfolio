import pino from 'pino';
import { env, isProduction } from '../config/env.js';

const prettyOptions = isProduction
  ? undefined
  : {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:standard', ignore: 'pid,hostname' },
    };

export const logger = pino({
  level: env.NODE_ENV === 'test' ? 'silent' : 'info',
  transport: prettyOptions,
  base: { service: 'dev-monir-api' },
});
