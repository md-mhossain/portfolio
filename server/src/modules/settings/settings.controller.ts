import type {Request, Response, NextFunction} from 'express';
import { settingsService } from "./settings.service.js";
import { sendSuccess } from "../../shared/response.js";
import { BadRequestError } from "../../shared/errors.js";

export const settingsController = {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await settingsService.get(req.query.keys as string | undefined);
      return sendSuccess(res, settings);
    } catch (error) {
      return next(error);
    }
  },

  async upsert(req: Request, res: Response, next: NextFunction) {
    try {
      const { key, value } = req.body;
      const setting = await settingsService.upsert(key, value);
      return sendSuccess(res, setting, { message: 'Setting saved.' });
    } catch (error) {
      return next(error);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const key = req.params.key as string;
      if (!key) return new BadRequestError('Setting key is required.');
      await settingsService.remove(key);
      return sendSuccess(res, null, { message: 'Setting removed.' });
    } catch (error) {
      return next(error);
    }
  },
};
