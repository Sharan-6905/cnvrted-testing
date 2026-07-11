import { Resend } from 'resend'

// Lazily instantiated — same reason as lib/supabase.ts: constructing at
// module scope with an unset key crashes the whole build during page-data
// collection, not just requests that use it.
let client: Resend | null = null

function getResend(): Resend {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY)
  }
  return client
}

/**
 * Sends the "thanks for registering" confirmation email after a successful
 * questionnaire submission. Best-effort: callers should not fail the
 * request if this throws — the database write is the source of truth,
 * a missed confirmation email is not worth rejecting a real submission over.
 */
export async function sendQuestionnaireConfirmation(email: string, name: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping confirmation email.')
    return
  }

  const firstName = name.trim().split(' ')[0] || 'there'

  await getResend().emails.send({
    from: 'CNVRTED <work@cnvrted.com>',
    to: email,
    subject: 'Thanks for registering — we\'ll be in touch',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:16px;font-weight:600;color:#FAFAFA;letter-spacing:-0.01em;">CNVRTED</p>
            </td>
          </tr>

          <tr>
            <td style="background:#171717;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:40px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:500;color:#A1A1A1;letter-spacing:0.08em;text-transform:uppercase;">Received</p>
              <h1 style="margin:0 0 16px;font-size:26px;font-weight:500;color:#FAFAFA;line-height:1.3;letter-spacing:-0.02em;">
                Thanks for registering, ${firstName}.
              </h1>
              <p style="margin:0;font-size:15px;color:#A1A1A1;line-height:1.6;">
                Our team will get in touch with you soon. A founder reads every response directly — no automated
                sequences, no ticketing queue.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#6B6B6B;">
                Questions in the meantime? Reply to this email or reach us at
                <a href="mailto:work@cnvrted.com" style="color:#A1A1A1;text-decoration:none;">work@cnvrted.com</a>
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#4A4A4A;">
                © 2026 CNVRTED. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  })
}
