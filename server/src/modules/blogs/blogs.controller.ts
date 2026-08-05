import { Request, Response, NextFunction } from "express";
import { blogsService } from "./blogs.service.js";
import { sendSuccess } from "../../shared/response.js";

export const blogsController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await blogsService.list({
        ...(req.query as Record<string, string | number | undefined>),
      });
      return sendSuccess(res, result.items, { meta: result.meta });
    } catch (error) {
      return next(error);
    }
  },

  async listPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await blogsService.list({
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
      const blog = await blogsService.getBySlug(req.params.slug, true, true);
      return sendSuccess(res, blog);
    } catch (error) {
      return next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await blogsService.getById(req.params.id);
      return sendSuccess(res, blog);
    } catch (error) {
      return next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await blogsService.create(req.body, req.user!.userId);
      return sendSuccess(res, blog, {
        statusCode: 201,
        message: "Blog created.",
      });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await blogsService.update(req.params.id, req.body);
      return sendSuccess(res, blog, { message: "Blog updated." });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await blogsService.delete(req.params.id);
      return sendSuccess(res, null, { message: "Blog deleted." });
    } catch (error) {
      return next(error);
    }
  },

  async stats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await blogsService.getStats();
      return sendSuccess(res, stats);
    } catch (error) {
      return next(error);
    }
  },
};
