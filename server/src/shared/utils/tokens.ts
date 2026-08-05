import jwt from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto';
import { env } from '../../config/env.js';

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: 'ADMIN' | 'USER';
  type: 'access';
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  sub: string;
  type: 'refresh';
  jti: string;
  iat: number;
  exp: number;
}

export function signAccessToken(payload: { userId: string; email: string; role: 'ADMIN' | 'USER' }): string {
  return jwt.sign(
    {
      sub: payload.userId,
      email: payload.email,
      role: payload.role,
      type: 'access',
    },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions['expiresIn'],
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
    },
  );
}

export function signRefreshToken(payload: { userId: string; jti: string }): string {
  return jwt.sign(
    {
      sub: payload.userId,
      type: 'refresh',
      jti: payload.jti,
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'],
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
    },
  );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, {
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  }) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET, {
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  }) as RefreshTokenPayload;
}

export function createTokenId(): string {
  return randomBytes(24).toString('hex');
}

/**
 * We only store a SHA-256 hash of the refresh token in the database,
 * so a database leak does not expose usable tokens.
 */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function generatePasswordResetToken(): { raw: string; hash: string } {
  const raw = randomBytes(32).toString('hex');
  return { raw, hash: hashToken(raw) };
}

export function generateOtp(): string {
  return randomBytes(4).toString('hex');
}
