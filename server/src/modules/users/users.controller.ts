import type {Request, Response, NextFunction} from 'express';
import { usersService } from "./users.service.js";
import { sendSuccess } from "../../shared/response.js";

export const usersController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await usersService.list({
        ...(req.query as Record<string, string | number | undefined>),
      });
      return sendSuccess(res, result.items, { meta: result.meta });
    } catch (error) {
      return next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.getById(req.params.id as string);
      return sendSuccess(res, user);
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.update(req.params.id as string, req.body);
      return sendSuccess(res, user, { message: 'User updated successfully.' });
    } catch (error) {
      return next(error);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.updateProfile(req.user!.userId, req.body);
      return sendSuccess(res, user, { message: 'Profile updated successfully.' });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await usersService.delete(req.params.id as string);
      return sendSuccess(res, null, { message: 'User deleted successfully.' });
    } catch (error) {
      return next(error);
    }
  },

  async stats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await usersService.getStats();
      return sendSuccess(res, stats);
    } catch (error) {
      return next(error);
    }
  },
};
