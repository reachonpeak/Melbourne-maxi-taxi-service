// Shared email validation used by the booking form (client) and the booking API (server).
// The MX/DNS check lives server-side only (see api/booking/route.js) because it needs Node's dns module.

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Known disposable / temporary email providers — these are the usual "fake" addresses.
export const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'temp-mail.org', 'guerrillamail.com', 'guerrillamail.info',
  '10minutemail.com', 'throwawaymail.com', 'yopmail.com', 'trashmail.com', 'getnada.com',
  'fakeinbox.com', 'sharklasers.com', 'maildrop.cc', 'dispostable.com', 'mintemail.com',
  'mailnesia.com', 'emailondeck.com', 'spam4.me', 'grr.la', 'tempinbox.com', 'moakt.com',
  'mohmal.com', 'tmpmail.org', 'mailcatch.com', 'inboxbear.com', 'tempmailo.com',
]);

// Popular real providers, used to catch common typos (e.g. gmial.com -> gmail.com).
const POPULAR_DOMAINS = [
  'gmail.com', 'yahoo.com', 'yahoo.com.au', 'hotmail.com', 'outlook.com', 'outlook.com.au',
  'icloud.com', 'live.com', 'live.com.au', 'aol.com', 'protonmail.com', 'proton.me',
  'bigpond.com', 'bigpond.net.au', 'optusnet.com.au', 'iinet.net.au', 'me.com',
];

export function getEmailDomain(email) {
  const at = String(email).lastIndexOf('@');
  return at < 0 ? '' : String(email).slice(at + 1).toLowerCase();
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const curr = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[n];
}

// Returns a corrected email string if the domain looks like a typo of a popular one, else null.
export function suggestEmailCorrection(email) {
  const at = String(email).lastIndexOf('@');
  if (at < 0) return null;
  const domain = getEmailDomain(email);
  if (!domain || POPULAR_DOMAINS.includes(domain)) return null;
  for (const candidate of POPULAR_DOMAINS) {
    const dist = levenshtein(domain, candidate);
    if (dist > 0 && dist <= 2) {
      return email.slice(0, at + 1) + candidate;
    }
  }
  return null;
}

// Gmail enforces its own username rules, so we can reject impossible Gmail addresses
// (e.g. hi@gmail.com) without sending a verification email. Google's rules:
//   - 6–30 characters, only letters/numbers/dots
//   - cannot start or end with a dot, no consecutive dots
function validateGmailLocalPart(localPart) {
  const lower = localPart.toLowerCase();
  if (/[^a-z0-9.]/.test(lower)) return 'A Gmail address can only contain letters, numbers and dots';
  if (lower.startsWith('.') || lower.endsWith('.')) return 'A Gmail address cannot start or end with a dot';
  if (lower.includes('..')) return 'A Gmail address cannot contain consecutive dots';
  const withoutDots = lower.replace(/\./g, '');
  if (withoutDots.length < 6) return 'That doesn\'t look like a real Gmail address (too short)';
  if (withoutDots.length > 30) return 'That doesn\'t look like a real Gmail address (too long)';
  return '';
}

// Synchronous checks (format + disposable + typo). Returns { error, suggestion }.
// error is '' when these checks pass. The MX check is done separately on the server.
export function validateEmailBasics(rawEmail) {
  const email = String(rawEmail || '').trim();
  if (!email) return { error: 'Email address is required' };
  if (!EMAIL_REGEX.test(email)) return { error: 'Please enter a valid email address' };

  const domain = getEmailDomain(email);
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { error: 'Please use a permanent email address (temporary email providers are not accepted)' };
  }

  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const localPart = email.slice(0, email.lastIndexOf('@'));
    const gmailError = validateGmailLocalPart(localPart);
    if (gmailError) return { error: gmailError };
  }

  const suggestion = suggestEmailCorrection(email);
  if (suggestion) return { error: `Did you mean ${suggestion}?`, suggestion };

  return { error: '' };
}
