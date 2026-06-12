import nodemailer from 'nodemailer';
import dns from 'node:dns/promises';
import { Timestamp } from 'firebase-admin/firestore';
import { EMAIL, PHONE, PHONE_DISPLAY } from '@/lib/site';
import { validateEmailBasics, getEmailDomain } from '@/lib/emailValidation';
import { generateOtpCode, signOtp, OTP_TTL_MS } from '@/lib/otp';
import { db } from '@/lib/firebase-admin';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Confirms the email's domain actually has mail servers (rejects fake/typo domains).
async function domainAcceptsMail(domain) {
  try {
    const records = await dns.resolveMx(domain);
    return Array.isArray(records) && records.length > 0;
  } catch {
    return false;
  }
}

// Best-effort per-email cooldown so the endpoint can't be used to spam someone's inbox.
const lastSentAt = new Map();

// Dedupe unverified-lead emails: a code resend shouldn't email the business twice.
const lastLeadAt = new Map();

// Amber "unverified lead" template — visually distinct from the confirmed booking email.
// Sent to the business the moment a customer reaches the verification step, so the
// lead (incl. phone number) is never lost even if they abandon or used a fake email.
function buildLeadHtml({ name, email, phone, pickup, dropoff, date, time, passengers, vehicle, babySeat, returnTrip, notes }) {
  const dateFormatted = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Not specified';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Unverified Lead — MelbourneMaxiTaxi</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);padding:36px 40px;text-align:center;">
            <div style="display:inline-block;background:#f59e0b;border-radius:8px;padding:6px 14px;margin-bottom:16px;">
              <span style="color:#fff;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;">⏳ Unverified Lead</span>
            </div>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;">MelbourneMaxiTaxi</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.55);font-size:14px;">A customer started a booking but hasn't verified their email yet</p>
          </td>
        </tr>

        <!-- Amber accent bar -->
        <tr>
          <td style="background:#f59e0b;padding:4px 0;"></td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;">

            <!-- Status note -->
            <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:16px 20px;margin-bottom:28px;">
              <p style="margin:0;color:#92400e;font-size:14px;line-height:1.65;">
                <strong>⚠️ Awaiting email verification.</strong> This customer reached the verification step but hasn't entered their code yet.
                If a <strong>"✅ Verified Booking"</strong> email arrives for them shortly, they completed it — ignore this one.
                If not, they abandoned (or used a fake email) — <strong>call them on the number below to win the booking.</strong>
              </p>
            </div>

            <!-- Customer Info -->
            <div style="margin-bottom:24px;">
              <div style="display:inline-block;background:rgba(245,158,11,0.1);border-radius:6px;padding:4px 12px;margin-bottom:12px;">
                <span style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#b45309;">Customer Details</span>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr>
                  <td style="background:#f8fafc;padding:14px 20px;border-bottom:1px solid #e2e8f0;width:50%;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">Full Name</span>
                    <span style="font-size:15px;font-weight:600;color:#0f172a;">${name}</span>
                  </td>
                  <td style="background:#f8fafc;padding:14px 20px;border-bottom:1px solid #e2e8f0;border-left:1px solid #e2e8f0;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">Phone Number</span>
                    <a href="tel:${phone}" style="font-size:15px;font-weight:600;color:#b45309;text-decoration:none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="background:#f8fafc;padding:14px 20px;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">Email Address (unverified)</span>
                    <a href="mailto:${email}" style="font-size:15px;font-weight:600;color:#b45309;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Trip Info -->
            <div style="margin-bottom:24px;">
              <div style="display:inline-block;background:rgba(245,158,11,0.1);border-radius:6px;padding:4px 12px;margin-bottom:12px;">
                <span style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#b45309;">Trip Details</span>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr>
                  <td style="background:#ffffff;padding:14px 20px;border-bottom:1px solid #e2e8f0;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">📍 Pickup Location</span>
                    <span style="font-size:15px;font-weight:600;color:#0f172a;">${pickup}</span>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f8fafc;padding:14px 20px;border-bottom:1px solid #e2e8f0;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">📍 Drop-off Location</span>
                    <span style="font-size:15px;font-weight:600;color:#0f172a;">${dropoff}</span>
                  </td>
                </tr>
                <tr>
                  <td style="background:#ffffff;padding:14px 20px;border-bottom:1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:50%;">
                          <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">📅 Date</span>
                          <span style="font-size:15px;font-weight:600;color:#0f172a;">${dateFormatted}</span>
                        </td>
                        <td>
                          <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">🕐 Time</span>
                          <span style="font-size:15px;font-weight:600;color:#0f172a;">${time || 'Not specified'}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f8fafc;padding:14px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:50%;">
                          <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">🚐 Vehicle / 👥 Pax</span>
                          <span style="font-size:15px;font-weight:600;color:#0f172a;">${vehicle || 'Not specified'} · ${passengers || '1'}</span>
                        </td>
                        <td>
                          <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">🍼 Seat / 🔄 Return</span>
                          <span style="font-size:15px;font-weight:600;color:#0f172a;">${babySeat || 'No'} · ${returnTrip === 'Yes' ? 'Return' : 'One way'}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>

            ${notes ? `
            <!-- Notes -->
            <div style="margin-bottom:24px;">
              <div style="display:inline-block;background:rgba(245,158,11,0.1);border-radius:6px;padding:4px 12px;margin-bottom:12px;">
                <span style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#b45309;">Additional Notes</span>
              </div>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;">
                <p style="margin:0;font-size:15px;color:#334155;line-height:1.65;">${notes.replace(/\n/g, '<br />')}</p>
              </div>
            </div>
            ` : ''}

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
              <tr>
                <td align="center">
                  <a href="tel:${phone}" style="display:inline-block;background:#f59e0b;color:#ffffff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;letter-spacing:0.01em;">📞 Call ${name}</a>
                  <span style="display:inline-block;width:12px;"></span>
                  <a href="https://wa.me/${String(phone).replace(/[^0-9+]/g, '')}" style="display:inline-block;background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;letter-spacing:0.01em;">💬 WhatsApp</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0a0a0a;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.35);font-size:12px;line-height:1.6;">
              MelbourneMaxiTaxi &nbsp;·&nbsp; Craigieburn, Melbourne VIC<br/>
              <a href="tel:${PHONE}" style="color:#f59e0b;text-decoration:none;">${PHONE_DISPLAY}</a>
              &nbsp;·&nbsp;
              <a href="mailto:${EMAIL}" style="color:#f59e0b;text-decoration:none;">${EMAIL}</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function buildOtpHtml(code) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Your verification code</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
  <tr>
    <td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">
        <tr>
          <td style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);padding:28px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.02em;">MelbourneMaxiTaxi</h1>
          </td>
        </tr>
        <tr><td style="background:#f26522;padding:3px 0;"></td></tr>
        <tr>
          <td style="background:#ffffff;padding:36px 40px;text-align:center;">
            <p style="margin:0 0 18px;color:#0f172a;font-size:16px;line-height:1.6;">Use this code to confirm your booking:</p>
            <div style="display:inline-block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 28px;margin-bottom:18px;">
              <span style="font-size:34px;font-weight:800;letter-spacing:10px;color:#0f172a;">${code}</span>
            </div>
            <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">This code expires in 10 minutes.<br/>If you didn't request it, you can safely ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0a0a0a;padding:18px 40px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.35);font-size:12px;">MelbourneMaxiTaxi &nbsp;·&nbsp; Craigieburn, Melbourne VIC</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, pickup, dropoff, date, time, passengers, vehicle, babySeat, returnTrip, notes, website } = body;

    // Honeypot: pretend success so bots proceed; the booking endpoint will reject them anyway.
    if (website) {
      console.warn('Spam filtered via send-code honeypot.');
      return Response.json({ success: true, token: 'x', expiresAt: Date.now() + OTP_TTL_MS });
    }

    const check = validateEmailBasics(email);
    if (check.error) {
      return Response.json({ error: check.error }, { status: 400 });
    }

    const cleanEmail = String(email).trim();
    if (!(await domainAcceptsMail(getEmailDomain(cleanEmail)))) {
      return Response.json({ error: "This email domain can't receive mail. Please check your email address." }, { status: 400 });
    }

    const key = cleanEmail.toLowerCase();
    if (Date.now() - (lastSentAt.get(key) || 0) < 55_000) {
      return Response.json({ error: 'Please wait a moment before requesting another code.' }, { status: 429 });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('SMTP Error: GMAIL_USER or GMAIL_APP_PASSWORD is not set in environment variables.');
      return Response.json({ error: 'Mail server configuration error. Please check your .env.local file.' }, { status: 500 });
    }

    const code = generateOtpCode();
    const expiresAt = Date.now() + OTP_TTL_MS;
    const token = signOtp(cleanEmail, code, expiresAt);

    await transporter.sendMail({
      from: `"MelbourneMaxiTaxi" <${process.env.GMAIL_USER}>`,
      to: cleanEmail,
      subject: `${code} is your MelbourneMaxiTaxi verification code`,
      html: buildOtpHtml(code),
    });

    lastSentAt.set(key, Date.now());

    // Save unverified lead to Firestore — returns tempLeadId so the booking step can update it
    let tempLeadId = null;
    try {
      const docRef = await db.collection('leads').add({
        type: 'booking',
        source: '/book',
        status: 'unverified',
        emailVerified: false,
        name: name || null,
        email: cleanEmail,
        phone: phone || null,
        booking: {
          pickup: pickup || null,
          dropoff: dropoff || null,
          date: date || null,
          time: time || null,
          vehicle: vehicle || null,
          passengers: passengers || null,
          babySeat: babySeat || null,
          returnTrip: returnTrip || null,
          notes: notes || null,
        },
        ipLocation: null,
        submittedFrom: '/book',
        createdAt: Timestamp.now(),
      });
      tempLeadId = docRef.id;
    } catch (fsErr) {
      console.error('Firestore write failed (send-code):', fsErr);
    }

    // Unverified-lead notification to the business (distinct amber template).
    // Sent at most once per code window per email, and never allowed to break the OTP flow.
    // NOTE: no Google Ads conversion fires here — gtag only runs client-side after a VERIFIED booking.
    if (name && phone && Date.now() - (lastLeadAt.get(key) || 0) > OTP_TTL_MS) {
      try {
        await transporter.sendMail({
          from: `"MelbourneMaxiTaxi Leads" <${process.env.GMAIL_USER}>`,
          to: EMAIL,
          replyTo: cleanEmail,
          subject: `⏳ Unverified lead: ${pickup || '?'} → ${dropoff || '?'} — ${name}`,
          html: buildLeadHtml({ name, email: cleanEmail, phone, pickup, dropoff, date, time, passengers, vehicle, babySeat, returnTrip, notes }),
        });
        lastLeadAt.set(key, Date.now());
      } catch (leadErr) {
        console.error('Unverified-lead email failed (code still sent):', leadErr);
      }
    }

    return Response.json({ success: true, token, expiresAt, tempLeadId });
  } catch (err) {
    console.error('Send verification code error:', err);
    return Response.json({ error: 'Failed to send verification code. Please try again.' }, { status: 500 });
  }
}
