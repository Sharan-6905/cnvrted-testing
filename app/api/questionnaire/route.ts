import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { validateEmailFormat, verifyEmailDeliverability } from '@/lib/emailValidation'
import { sendQuestionnaireConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    name,
    phone,
    email,
    role,
    whatTheyDo,
    teamSize,
    location,
    usedSalesTool,
    toolsUsed,
    companyName,
    biggestChallenge,
    urgency,
    demoAvailability,
  } = body

  if (!name?.trim() || !phone?.trim() || !email?.trim() || !role?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const formatCheck = validateEmailFormat(email)
  if (!formatCheck.valid) {
    return NextResponse.json({ error: formatCheck.reason ?? 'Invalid email' }, { status: 400 })
  }

  // Real-time mailbox check (Abstract API) — only reaches here after the
  // free local checks pass, to avoid spending API quota on obvious junk.
  const deliverabilityCheck = await verifyEmailDeliverability(email)
  if (!deliverabilityCheck.valid) {
    return NextResponse.json({ error: deliverabilityCheck.reason ?? 'Invalid email' }, { status: 400 })
  }

  const { error } = await getSupabase().from('questionnaire_responses').insert({
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    role: role.trim(),
    what_they_do: whatTheyDo?.trim() || null,
    team_size: teamSize || null,
    location: location?.trim() || null,
    used_sales_tool: !!usedSalesTool,
    tools_used: usedSalesTool ? toolsUsed?.trim() || null : null,
    company_name: companyName?.trim() || null,
    biggest_challenge: biggestChallenge?.trim() || null,
    urgency: urgency || null,
    demo_availability: demoAvailability?.trim() || null,
  })

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  // Best-effort — the submission already succeeded (it's in the database),
  // so a failed confirmation email should not turn this into an error
  // response. Log and move on.
  try {
    await sendQuestionnaireConfirmation(email.trim(), name.trim())
  } catch (err) {
    console.error('Failed to send confirmation email:', err)
  }

  return NextResponse.json({ success: true })
}
