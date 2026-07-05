import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // Save to Supabase
  const { error: dbError } = await supabase
    .from('beta_signups')
    .insert({ name: name?.trim() || null, email: email.trim(), phone: phone?.trim() || null })

  if (dbError) {
    if (dbError.code === '23505') {
      return NextResponse.json({ error: 'already_signed_up' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  // Send confirmation email
  const firstName = name?.trim().split(' ')[0] || 'there'

  await resend.emails.send({
    from: 'CNVRTED <work@cnvrted.com>',
    to: email.trim(),
    subject: `${firstName}, your early access request is confirmed`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:18px;font-weight:600;color:#ffffff;letter-spacing:0.05em;">CNVRTED</p>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background:#141414;border:1px solid #222;border-radius:16px;padding:40px;">

              <p style="margin:0 0 8px;font-size:11px;font-weight:500;color:#0B6B66;letter-spacing:0.1em;text-transform:uppercase;">Early access confirmed</p>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:600;color:#ffffff;line-height:1.3;">
                Hey ${firstName}, you're ahead of the line.
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#888;line-height:1.6;">
                Your early access request for CNVRTED is confirmed. We're onboarding revenue teams in small batches — you'll hear from us directly to schedule your onboarding call.
              </p>

              <hr style="border:none;border-top:1px solid #222;margin:0 0 28px;">

              <p style="margin:0 0 16px;font-size:13px;font-weight:500;color:#ffffff;">What happens next</p>

              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding-bottom:16px;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;padding-top:2px;">
                          <span style="display:inline-block;width:20px;height:20px;background:#0B6B6620;border-radius:50%;text-align:center;font-size:11px;color:#0B6B66;line-height:20px;font-weight:600;">1</span>
                        </td>
                        <td style="padding-left:10px;">
                          <p style="margin:0;font-size:14px;color:#aaa;line-height:1.5;">We review your request and match you with the right onboarding slot.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:16px;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;padding-top:2px;">
                          <span style="display:inline-block;width:20px;height:20px;background:#0B6B6620;border-radius:50%;text-align:center;font-size:11px;color:#0B6B66;line-height:20px;font-weight:600;">2</span>
                        </td>
                        <td style="padding-left:10px;">
                          <p style="margin:0;font-size:14px;color:#aaa;line-height:1.5;">You'll receive a calendar invite to walk through your ICP setup and signal configuration.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;padding-top:2px;">
                          <span style="display:inline-block;width:20px;height:20px;background:#0B6B6620;border-radius:50%;text-align:center;font-size:11px;color:#0B6B66;line-height:20px;font-weight:600;">3</span>
                        </td>
                        <td style="padding-left:10px;">
                          <p style="margin:0;font-size:14px;color:#aaa;line-height:1.5;">Your pipeline starts showing real buying signals — accounts that are actually in-market.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#444;">
                Questions? Reply to this email or reach us at
                <a href="mailto:work@cnvrted.com" style="color:#0B6B66;text-decoration:none;">work@cnvrted.com</a>
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#333;">
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

  return NextResponse.json({ success: true })
}
