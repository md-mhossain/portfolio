import { Router } from 'express';
import { settingsController } from './settings.controller.js';
import { upsertSettingSchema } from './settings.schemas.js';
import { validate } from '../../middleware/validate.js';
import { authenticate, requireAdmin } from '../../middleware/auth.js';

const settingsRouter = Router();

// Public settings (e.g. site name, hero copy)
settingsRouter.get('/', settingsController.get);

// Protected admin routes
settingsRouter.use(authenticate, requireAdmin);

settingsRouter.put('/', validate({ body: upsertSettingSchema }), settingsController.upsert);
settingsRouter.delete('/:key', settingsController.remove);

export default settingsRouter;
