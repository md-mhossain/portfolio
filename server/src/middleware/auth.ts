import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../shared/utils/tokens.js";
import { UnauthorizedError } from "../shared/errors.js";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(new UnauthorizedError("Access token is required."));
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      userId: payload.id,
      email: payload.email,
      role: payload.role,
    };

    return next();
  } catch {
    return next(new UnauthorizedError("Invalid or expired access token."));
  }
}

export function requireRole(...roles: Array<"ADMIN" | "USER">) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError("Authentication required."));
    }
    if (!roles.includes(req.user.role)) {
      return next(new UnauthorizedError("Insufficient permissions."));
    }
    return next();
  };
}

export const requireAdmin = requireRole("ADMIN");
