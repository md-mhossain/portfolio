import { Request, Response, NextFunction } from 'express';
import { projectsService } from './projects.service.js';
import { sendSuccess } from '../../shared/response.js';

export const projectsController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await projectsService.list({
        ...(req.query as Record<string, string | number | undefined>),
      });
      return sendSuccess(res, result.items, { meta: result.meta });
    } catch (error) {
      return next(error);
    }
  },

  async listPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await projectsService.list({
        ...(req.query as Record<string, string | number | undefined>),
        publicOnly: true,
      });
      return sendSuccess(res, result.items, { meta: result.meta });
    } catch (error) {
      return next(error);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectsService.getBySlug(req.params.slug, true);
      return sendSuccess(res, project);
    } catch (error) {
      return next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectsService.getById(req.params.id);
      return sendSuccess(res, project);
    } catch (error) {
      return next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectsService.create(req.body);
      return sendSuccess(res, project, { statusCode: 201, message: 'Project created.' });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectsService.update(req.params.id, req.body);
      return sendSuccess(res, project, { message: 'Project updated.' });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await projectsService.delete(req.params.id);
      return sendSuccess(res, null, { message: 'Project deleted.' });
    } catch (error) {
      return next(error);
    }
  },

  async stats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await projectsService.getStats();
      return sendSuccess(res, stats);
    } catch (error) {
      return next(error);
    }
  },
};
