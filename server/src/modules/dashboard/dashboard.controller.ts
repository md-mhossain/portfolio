import type {Request, Response, NextFunction} from 'express';
import { dashboardService } from './dashboard.service.js';
import { sendSuccess } from '../../shared/response.js';

export const dashboardController = {
  async summary(_req: Request, res: Response, next: NextFunction) {
    try {
      const summary = await dashboardService.summary();
      return sendSuccess(res, summary);
    } catch (error) {
      return next(error);
    }
  },
};
