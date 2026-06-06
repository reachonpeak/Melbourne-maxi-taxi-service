import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function buildBookingHtml({ name, phone, pickup, dropoff, date, time, passengers, vehicle, babySeat, returnTrip, notes }) {
  const dateFormatted = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Not specified';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Booking — Melbourne Maxi Cab</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);padding:36px 40px;text-align:center;">
            <div style="display:inline-block;background:#f26522;border-radius:8px;padding:6px 14px;margin-bottom:16px;">
              <span style="color:#fff;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;">🚖 New Booking</span>
            </div>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;">Melbourne Maxi Cab Service</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.55);font-size:14px;">A new ride has been booked through the website</p>
          </td>
        </tr>

        <!-- Orange accent bar -->
        <tr>
          <td style="background:#f26522;padding:4px 0;"></td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;">

            <!-- Greeting -->
            <p style="margin:0 0 28px;color:#0f172a;font-size:16px;line-height:1.6;">
              A new booking request has been submitted. Please review and confirm the ride details below.
            </p>

            <!-- Customer Info -->
            <div style="margin-bottom:24px;">
              <div style="display:inline-block;background:rgba(242,101,34,0.08);border-radius:6px;padding:4px 12px;margin-bottom:12px;">
                <span style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#f26522;">Customer Details</span>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr>
                  <td style="background:#f8fafc;padding:14px 20px;border-bottom:1px solid #e2e8f0;width:50%;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">Full Name</span>
                    <span style="font-size:15px;font-weight:600;color:#0f172a;">${name}</span>
                  </td>
                  <td style="background:#f8fafc;padding:14px 20px;border-bottom:1px solid #e2e8f0;border-left:1px solid #e2e8f0;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">Phone Number</span>
                    <a href="tel:${phone}" style="font-size:15px;font-weight:600;color:#f26522;text-decoration:none;">${phone}</a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Trip Info -->
            <div style="margin-bottom:24px;">
              <div style="display:inline-block;background:rgba(242,101,34,0.08);border-radius:6px;padding:4px 12px;margin-bottom:12px;">
                <span style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#f26522;">Trip Details</span>
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
              </table>
            </div>

            <!-- Vehicle & Options -->
            <div style="margin-bottom:24px;">
              <div style="display:inline-block;background:rgba(242,101,34,0.08);border-radius:6px;padding:4px 12px;margin-bottom:12px;">
                <span style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#f26522;">Vehicle & Options</span>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr>
                  <td style="background:#f8fafc;padding:14px 20px;border-bottom:1px solid #e2e8f0;width:50%;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">🚐 Vehicle Type</span>
                    <span style="font-size:15px;font-weight:600;color:#0f172a;">${vehicle || 'Not specified'}</span>
                  </td>
                  <td style="background:#f8fafc;padding:14px 20px;border-bottom:1px solid #e2e8f0;border-left:1px solid #e2e8f0;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">👥 Passengers</span>
                    <span style="font-size:15px;font-weight:600;color:#0f172a;">${passengers || '1'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="background:#ffffff;padding:14px 20px;width:50%;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">🍼 Baby/Booster Seat</span>
                    <span style="font-size:15px;font-weight:600;color:#0f172a;">${babySeat || 'No'}</span>
                  </td>
                  <td style="background:#ffffff;padding:14px 20px;border-left:1px solid #e2e8f0;">
                    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">🔄 Return Trip</span>
                    <span style="font-size:15px;font-weight:600;color:#0f172a;">${returnTrip === 'Yes' ? 'Yes — Return' : 'One way'}</span>
                  </td>
                </tr>
              </table>
            </div>

            ${notes ? `
            <!-- Notes -->
            <div style="margin-bottom:24px;">
              <div style="display:inline-block;background:rgba(242,101,34,0.08);border-radius:6px;padding:4px 12px;margin-bottom:12px;">
                <span style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#f26522;">Additional Notes</span>
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
                  <a href="tel:${phone}" style="display:inline-block;background:#f26522;color:#ffffff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;letter-spacing:0.01em;">📞 Call ${name}</a>
                  <span style="display:inline-block;width:12px;"></span>
                  <a href="https://wa.me/${phone.replace(/[^0-9+]/g, '')}" style="display:inline-block;background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;letter-spacing:0.01em;">💬 WhatsApp</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0a0a0a;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.35);font-size:12px;line-height:1.6;">
              Melbourne Maxi Cab Service &nbsp;·&nbsp; Craigieburn, Melbourne VIC<br/>
              <a href="tel:+61455906197" style="color:#f26522;text-decoration:none;">0455 906 197</a>
              &nbsp;·&nbsp;
              <a href="mailto:melbournemaxicabservice@gmail.com" style="color:#f26522;text-decoration:none;">melbournemaxicabservice@gmail.com</a>
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

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, pickup, dropoff, date, time, passengers, vehicle, babySeat, returnTrip, notes } = body;

    if (!name || !phone || !pickup || !dropoff || !date || !time) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"Melbourne Maxi Cab Booking" <${process.env.GMAIL_USER}>`,
      to: 'melbournemaxicabservice@gmail.com',
      subject: `🚖 New Booking: ${pickup} → ${dropoff} — ${name}`,
      html: buildBookingHtml({ name, phone, pickup, dropoff, date, time, passengers, vehicle, babySeat, returnTrip, notes }),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Booking form error:', err);
    return Response.json({ error: 'Failed to submit booking. Please try again.' }, { status: 500 });
  }
}
