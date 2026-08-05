import { Router } from 'express';
import { analyticsController } from './analytics.controller.js';
import { analyticsQuerySchema, trackEventSchema } from './analytics.schemas.js';
import { validate } from '../../middleware/validate.js';
import { authenticate, requireAdmin } from '../../middleware/auth.js';

const analyticsRouter = Router();

// Public tracking endpoint
analyticsRouter.post('/track', validate({ body: trackEventSchema }), analyticsController.track);

// Protected admin routes
analyticsRouter.use(authenticate, requireAdmin);

analyticsRouter.get('/overview', validate({ query: analyticsQuerySchema }), analyticsController.overview);

export default analyticsRouter;
