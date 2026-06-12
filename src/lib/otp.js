// Stateless email OTP — server-only (uses node:crypto).
// The server emails the user a 6-digit code and returns to the browser ONLY an
// HMAC-signed token of (email|code|expiry). The browser never sees the code.
// At booking time the server re-signs (email|entered code|expiry) and compares:
// match → mailbox proven real; mismatch → wrong code. No database required.
import crypto from 'node:crypto';

export const OTP_TTL_MS = 10 * 60 * 1000; // codes valid for 10 minutes

const secret = () => process.env.OTP_SECRET || process.env.GMAIL_APP_PASSWORD || '';

const payload = (email, code, expiresAt) =>
  `${String(email).trim().toLowerCase()}|${String(code).trim()}|${Number(expiresAt)}`;

export function generateOtpCode() {
  return String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
}

export function signOtp(email, code, expiresAt) {
  return crypto.createHmac('sha256', secret()).update(payload(email, code, expiresAt)).digest('hex');
}

// Returns '' when valid, otherwise a user-facing error message.
export function verifyOtp({ email, code, expiresAt, token }) {
  if (!secret()) return 'Verification is not configured on the server.';
  if (!code || !token || !expiresAt) return 'Email verification is required. Please request a code.';
  const exp = Number(expiresAt);
  if (!Number.isFinite(exp) || Date.now() > exp) {
    return 'Your verification code has expired. Please request a new one.';
  }
  const expected = Buffer.from(signOtp(email, code, exp), 'hex');
  const provided = Buffer.from(String(token), 'hex');
  if (expected.length !== provided.length || !crypto.timingSafeEqual(expected, provided)) {
    return 'Incorrect verification code. Please check the code and try again.';
  }
  return '';
}
