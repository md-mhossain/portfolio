import { Router } from 'express';
import { authController } from "./auth.controller.js";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./auth.schemas.js";
import { validate } from "../../middleware/validate.js";
import { authenticate } from "../../middleware/auth.js";
import { authLimiter } from "../../middleware/rate-limiter.js";

const authRouter = Router();

authRouter.post(
  '/register',
  authLimiter,
  validate({ body: registerSchema }),
  authController.register,
);

authRouter.post('/login', authLimiter, validate({ body: loginSchema }), authController.login);

authRouter.post('/refresh', authController.refresh);

authRouter.post('/logout', authController.logout);

authRouter.post('/logout-all', authenticate, authController.logoutAll);

authRouter.get('/me', authenticate, authController.me);

authRouter.post(
  '/change-password',
  authenticate,
  validate({ body: changePasswordSchema }),
  authController.changePassword,
);

authRouter.post(
  '/forgot-password',
  authLimiter,
  validate({ body: forgotPasswordSchema }),
  authController.forgotPassword,
);

authRouter.post(
  '/reset-password',
  authLimiter,
  validate({ body: resetPasswordSchema }),
  authController.resetPassword,
);

export default authRouter;
