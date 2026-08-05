import { Router } from 'express';
import { messagesController } from './messages.controller.js';
import {
  createMessageSchema,
  messageIdSchema,
  messageQuerySchema,
  updateMessageSchema,
} from './messages.schemas.js';
import { validate } from '../../middleware/validate.js';
import { authenticate, requireAdmin } from '../../middleware/auth.js';

const messagesRouter = Router();

// Public route
messagesRouter.post('/', validate({ body: createMessageSchema }), messagesController.create);

// Protected admin routes
messagesRouter.use(authenticate, requireAdmin);

messagesRouter.get('/', validate({ query: messageQuerySchema }), messagesController.list);
messagesRouter.get('/stats', messagesController.stats);
messagesRouter.get('/:id', validate({ params: messageIdSchema }), messagesController.getById);
messagesRouter.patch(
  '/:id',
  validate({ params: messageIdSchema, body: updateMessageSchema }),
  messagesController.updateStatus,
);
messagesRouter.delete('/:id', validate({ params: messageIdSchema }), messagesController.delete);

export default messagesRouter;
