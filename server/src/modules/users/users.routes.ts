import { Router } from 'express';
import { usersController } from './users.controller.js';
import { updateProfileSchema, updateUserSchema, userIdSchema, userQuerySchema } from './users.schemas.js';
import { validate } from '../../middleware/validate.js';
import { authenticate, requireAdmin } from '../../middleware/auth.js';

const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get('/', requireAdmin, validate({ query: userQuerySchema }), usersController.list);
usersRouter.get('/stats', requireAdmin, usersController.stats);
usersRouter.patch(
  '/profile',
  validate({ body: updateProfileSchema }),
  usersController.updateProfile,
);
usersRouter.patch(
  '/:id',
  requireAdmin,
  validate({ params: userIdSchema, body: updateUserSchema }),
  usersController.update,
);
usersRouter.delete(
  '/:id',
  requireAdmin,
  validate({ params: userIdSchema }),
  usersController.delete,
);

export default usersRouter;
