import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service.js";
import { sendSuccess } from "../../shared/response.js";
import { sendPasswordResetEmail } from "../../shared/mailer.js";
import { env } from "../../config/env.js";
import { BadRequestError, UnauthorizedError } from "../../shared/errors.js";

const REFRESH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function setRefreshCookie(res: Response, refreshToken: string) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: REFRESH_COOKIE_MAX_AGE,
    path: "/api/v1/auth",
  });
}

function clearRefreshCookie(res: Response) {
  res.clearCookie("refreshToken", { path: "/api/v1/auth" });
}

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      setRefreshCookie(res, result.refreshToken);
      return sendSuccess(res, result, {
        statusCode: 201,
        message: "Account created successfully.",
      });
    } catch (error) {
      return next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      setRefreshCookie(res, result.refreshToken);
      return sendSuccess(res, result, { message: "Logged in successfully." });
    } catch (error) {
      return next(error);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.body?.refreshToken ?? req.cookies?.refreshToken;
      if (!refreshToken) {
        throw new BadRequestError("Missing refresh token.");
      }
      const result = await authService.refresh(refreshToken);
      setRefreshCookie(res, result.refreshToken);
      return sendSuccess(res, result, {
        message: "Token refreshed successfully.",
      });
    } catch (error) {
      return next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.body?.refreshToken ?? req.cookies?.refreshToken;
      await authService.logout(refreshToken);
      clearRefreshCookie(res);
      return sendSuccess(res, null, { message: "Logged out successfully." });
    } catch (error) {
      return next(error);
    }
  },

  async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new UnauthorizedError("Authentication required.");
      await authService.logoutAll(req.user.userId);
      clearRefreshCookie(res);
      return sendSuccess(res, null, {
        message: "Logged out from all devices.",
      });
    } catch (error) {
      return next(error);
    }
  },

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new UnauthorizedError("Authentication required.");
      const user = await authService.findSafeById(req.user.userId);
      return sendSuccess(res, user);
    } catch (error) {
      return next(error);
    }
  },

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new UnauthorizedError("Authentication required.");
      await authService.changePassword(req.user.userId, req.body);
      clearRefreshCookie(res);
      return sendSuccess(res, null, {
        message: "Password changed successfully.",
      });
    } catch (error) {
      return next(error);
    }
  },

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { resetToken } = await authService.forgotPassword(req.body);
      if (resetToken) {
        const resetLink = authService.buildResetLink(resetToken);
        await sendPasswordResetEmail(req.body.email, resetLink);
      }
      return sendSuccess(res, null, {
        message:
          "If an account exists for this email, a reset link has been sent.",
      });
    } catch (error) {
      return next(error);
    }
  },

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.resetPassword(req.body);
      return sendSuccess(res, null, {
        message: "Password reset successfully. You can now log in.",
      });
    } catch (error) {
      return next(error);
    }
  },
};
