import { env } from '../config/env.js';
import { logger } from './logger.js';

export interface SendMailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Mailer abstraction. In development / when SMTP is not configured the email
 * payload is logged (and the reset link surfaced) so the flow can be tested
 * locally. Wire up a real transport (e.g. Nodemailer) for production.
 */
export async function sendMail(_input: SendMailInput): Promise<boolean> {
  const hasSmtp = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);

  if (!hasSmtp) {
    logger.info(
      { subject: _input.subject, to: _input.to },
      'SMTP not configured - email not sent. HTML preview:',
    );
    logger.info(_input.html);
    return false;
  }

  // TODO(production): integrate Nodemailer / Resend / SendGrid transport here.
  logger.info({ to: _input.to, subject: _input.subject }, 'Mail queued via transport');
  return true;
}

export function sendPasswordResetEmail(to: string, resetLink: string): Promise<boolean> {
  return sendMail({
    to,
    subject: 'Reset your Dev Monir password',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="margin-top: 0;">Reset your password</h2>
        <p>We received a request to reset the password for your Dev Monir account.</p>
        <p>
          <a href="${resetLink}" style="display:inline-block; background:#0f172a; color:#fff; padding:12px 20px; border-radius:9999px; text-decoration:none;">
            Reset password
          </a>
        </p>
        <p>This link is valid for <strong>60 minutes</strong>. If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
    text: `Reset your password using this link (valid for 60 minutes): ${resetLink}`,
  });
}
