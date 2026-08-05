import { Request, Response, NextFunction } from 'express';
import { skillsService } from './skills.service.js';
import { sendSuccess } from '../../shared/response.js';

export const skillsController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await skillsService.list({
        ...(req.query as Record<string, string | number | undefined>),
      });
      return sendSuccess(res, result.items, { meta: result.meta });
    } catch (error) {
      return next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const skill = await skillsService.getById(req.params.id);
      return sendSuccess(res, skill);
    } catch (error) {
      return next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const skill = await skillsService.create(req.body);
      return sendSuccess(res, skill, { statusCode: 201, message: 'Skill created.' });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const skill = await skillsService.update(req.params.id, req.body);
      return sendSuccess(res, skill, { message: 'Skill updated.' });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await skillsService.delete(req.params.id);
      return sendSuccess(res, null, { message: 'Skill deleted.' });
    } catch (error) {
      return next(error);
    }
  },
};
