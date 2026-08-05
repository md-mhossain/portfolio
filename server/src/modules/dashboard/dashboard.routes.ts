import { Router } from 'express';
import { dashboardController } from './dashboard.controller.js';
import { authenticate, requireAdmin } from '../../middleware/auth.js';

const dashboardRouter = Router();

dashboardRouter.use(authenticate, requireAdmin);
dashboardRouter.get('/summary', dashboardController.summary);

export default dashboardRouter;
