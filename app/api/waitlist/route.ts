import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // Save to Supabase
  const { error: dbError } = await supabase
    .from('waitlist')
    .insert({ email: email.trim() })

  if (dbError) {
    if (dbError.code === '23505') {
      return NextResponse.json({ error: 'already_on_list' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  // Send confirmation email
  await resend.emails.send({
    from: 'CNVRTED <work@cnvrted.com>',
    to: email.trim(),
    subject: "You're on the CNVRTED waitlist",
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

              <p style="margin:0 0 8px;font-size:11px;font-weight:500;color:#0B6B66;letter-spacing:0.1em;text-transform:uppercase;">You're in</p>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:600;color:#ffffff;line-height:1.3;">
                We'll reach out when it's your turn.
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#888;line-height:1.6;">
                You've joined the CNVRTED waitlist. We're onboarding teams in batches — we'll email you the moment your spot is ready.
              </p>

              <hr style="border:none;border-top:1px solid #222;margin:0 0 28px;">

              <p style="margin:0 0 12px;font-size:13px;font-weight:500;color:#ffffff;">What CNVRTED does</p>
              <p style="margin:0 0 8px;font-size:14px;color:#888;line-height:1.6;">
                We monitor the dark funnel — LinkedIn, Reddit, X, job boards, and the open web — to surface accounts that are actually in-market right now, with full context on why, who to reach, and what to say.
              </p>

              <div style="margin:24px 0;padding:16px;background:#0B6B6615;border:1px solid #0B6B6630;border-radius:10px;">
                <p style="margin:0;font-size:13px;color:#0B6B66;line-height:1.6;">
                  Signal. Match. Context. Action. — your reps always know which account to call and exactly why.
                </p>
              </div>

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
