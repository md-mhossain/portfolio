import type {Request, Response, NextFunction} from 'express';
import { messagesService } from "./messages.service.js";
import { sendSuccess } from "../../shared/response.js";

export const messagesController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await messagesService.create(req.body, {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
      });
      return sendSuccess(res, message, {
        statusCode: 201,
        message: 'Your message has been sent. I will get back to you soon.',
      });
    } catch (error) {
      return next(error);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await messagesService.list({
        ...(req.query as Record<string, string | number | undefined>),
      });
      return sendSuccess(res, result.items, { meta: result.meta });
    } catch (error) {
      return next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await messagesService.getById(req.params.id as string);
      return sendSuccess(res, message);
    } catch (error) {
      return next(error);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await messagesService.updateStatus(req.params.id as string, req.body.status);
      return sendSuccess(res, message, { message: 'Message status updated.' });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await messagesService.delete(req.params.id as string);
      return sendSuccess(res, null, { message: 'Message deleted.' });
    } catch (error) {
      return next(error);
    }
  },

  async stats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await messagesService.getStats();
      return sendSuccess(res, stats);
    } catch (error) {
      return next(error);
    }
  },
};
