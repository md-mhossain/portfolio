import type {Request, Response, NextFunction} from 'express';
import { analyticsService } from './analytics.service.js';
import { sendSuccess } from '../../shared/response.js';

export const analyticsController = {
  async track(req: Request, res: Response, next: NextFunction) {
    try {
      await analyticsService.track(req.body, {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
      });
      return sendSuccess(res, null, { statusCode: 201 });
    } catch (error) {
      return next(error);
    }
  },

  async overview(req: Request, res: Response, next: NextFunction) {
    try {
      const days = Number(req.query.days ?? 30);
      const overview = await analyticsService.overview(days);
      return sendSuccess(res, overview);
    } catch (error) {
      return next(error);
    }
  },
};
