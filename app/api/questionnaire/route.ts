import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const { error } = await supabase.from('questionnaire_responses').insert({
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

  return NextResponse.json({ success: true })
}
