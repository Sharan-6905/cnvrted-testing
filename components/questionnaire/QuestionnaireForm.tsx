'use client'

import { useId, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { validateEmailFormat } from '@/lib/emailValidation'

const TEAM_SIZES = ['Just me', '2–10', '11–50', '51–200', '200+']
const URGENCY_OPTIONS = ['Actively looking', 'Exploring', 'Just curious']

const labelClass = 'text-caption font-medium text-text-secondary'
const inputClass =
  'w-full rounded-md border border-border bg-surface-raised px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 disabled:opacity-50 transition-colors duration-150'

/** Selectable option — same shape/type treatment as Tag (rounded-md, font-mono, uppercase), not a rounded-full pill. */
function OptionChip({
  selected,
  disabled,
  onClick,
  children,
}: {
  selected: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={[
        'rounded-md border px-3 py-2',
        'text-mono-tag font-mono uppercase tracking-label',
        'transition-colors duration-150',
        selected
          ? 'border-accent bg-accent-dim text-accent'
          : 'border-border bg-surface-raised text-text-secondary hover:border-text-secondary',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

/** Step wrapper — same card shape as the "How it works" section: numbered circle, rounded-lg border card. */
function Step({
  number,
  title,
  description,
  children,
}: {
  number: number
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 md:p-8 flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-body font-semibold text-white shrink-0"
          style={{ background: 'var(--color-accent)' }}
        >
          {number}
        </div>
        <div className="flex flex-col gap-1 pt-1">
          <h3 className="text-h3 font-medium text-text-primary">{title}</h3>
          {description && <p className="text-body text-text-secondary">{description}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-5 pl-0 md:pl-[52px]">{children}</div>
    </div>
  )
}

export function QuestionnaireForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [whatTheyDo, setWhatTheyDo] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [location, setLocation] = useState('')
  const [usedSalesTool, setUsedSalesTool] = useState<boolean | null>(null)
  const [toolsUsed, setToolsUsed] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [biggestChallenge, setBiggestChallenge] = useState('')
  const [urgency, setUrgency] = useState('')
  const [demoAvailability, setDemoAvailability] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const nameId = useId()
  const phoneId = useId()
  const emailId = useId()
  const roleId = useId()
  const whatId = useId()
  const teamId = useId()
  const locId = useId()
  const toolsId = useId()
  const companyId = useId()
  const challengeId = useId()
  const urgencyId = useId()
  const demoAvailabilityId = useId()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !email.trim() || !role.trim()) {
      setError('Please fill in the required fields.')
      return
    }
    const emailCheck = validateEmailFormat(email)
    if (!emailCheck.valid) {
      setError(emailCheck.reason ?? 'Enter a valid email address.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, email, role, whatTheyDo, teamSize, location,
          usedSalesTool: !!usedSalesTool, toolsUsed, companyName, biggestChallenge, urgency, demoAvailability,
        }),
      })
      if (!res.ok) {
        // Surface the API's specific reason (e.g. "This email address
        // doesn't appear to exist") instead of a generic fallback — only
        // fall back if the response body isn't the JSON shape we expect.
        const data = await res.json().catch(() => null)
        setError(data?.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border border-border bg-surface p-10 text-center flex flex-col items-center gap-4 max-w-[640px] mx-auto">
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
          <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
            <path d="M4 11l5 5L18 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <SectionLabel className="mb-2">Received</SectionLabel>
          <h2 className="text-h3 font-medium text-text-primary mb-2">Thanks, {name.split(' ')[0]}.</h2>
          <p className="text-body text-text-secondary leading-relaxed">
            We've got your responses. Our team will reach out directly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 md:gap-5 max-w-[640px] mx-auto">

      <Step number={1} title="Who you are">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={nameId} className={labelClass}>Full name <span className="text-red-400">*</span></label>
          <input id={nameId} type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Your name" autoComplete="name" disabled={loading} className={inputClass} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={phoneId} className={labelClass}>Phone number <span className="text-red-400">*</span></label>
            <input id={phoneId} type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="+91 98765 43210" autoComplete="tel" disabled={loading} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={emailId} className={labelClass}>Work email <span className="text-red-400">*</span></label>
            <input id={emailId} type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com" autoComplete="email" disabled={loading} className={inputClass} />
          </div>
        </div>
      </Step>

      <Step number={2} title="Where you work">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={companyId} className={labelClass}>Company name</label>
          <input id={companyId} type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
            placeholder="Acme Corp" autoComplete="organization" disabled={loading} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={roleId} className={labelClass}>Role / job title <span className="text-red-400">*</span></label>
          <input id={roleId} type="text" value={role} onChange={e => setRole(e.target.value)}
            placeholder="e.g. Head of Sales" disabled={loading} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={whatId} className={labelClass}>What do you do?</label>
          <textarea id={whatId} value={whatTheyDo} onChange={e => setWhatTheyDo(e.target.value)}
            placeholder="Briefly describe your day-to-day and what you're responsible for"
            disabled={loading} rows={3} className={`${inputClass} resize-none`} />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className={labelClass} id={`${teamId}-label`}>Team size</span>
          <div role="radiogroup" aria-labelledby={`${teamId}-label`} className="flex flex-wrap gap-2">
            {TEAM_SIZES.map(size => (
              <OptionChip key={size} selected={teamSize === size} disabled={loading} onClick={() => setTeamSize(size)}>
                {size}
              </OptionChip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={locId} className={labelClass}>Location <span className="text-red-400">*</span></label>
          <input id={locId} type="text" value={location} onChange={e => setLocation(e.target.value)}
            placeholder="City, Country" disabled={loading} className={inputClass} />
        </div>
      </Step>

      <Step number={3} title="Your current tooling">
        <div className="flex flex-col gap-1.5">
          <span className={labelClass} id={`${toolsId}-label`}>Have you used any sales tool before?</span>
          <div role="radiogroup" aria-labelledby={`${toolsId}-label`} className="flex gap-2">
            {(['Yes', 'No'] as const).map(opt => {
              const val = opt === 'Yes'
              return (
                <OptionChip key={opt} selected={usedSalesTool === val} disabled={loading} onClick={() => setUsedSalesTool(val)}>
                  {opt}
                </OptionChip>
              )
            })}
          </div>
        </div>
        {usedSalesTool && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={toolsId} className={labelClass}>Which ones?</label>
            <input id={toolsId} type="text" value={toolsUsed} onChange={e => setToolsUsed(e.target.value)}
              placeholder="e.g. Apollo, Salesloft, HubSpot" disabled={loading} className={inputClass} />
          </div>
        )}
      </Step>

      <Step number={4} title="The gap" description="Optional — helps us prioritize what to build.">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={challengeId} className={labelClass}>What's your biggest challenge finding accounts that are actually ready to buy?</label>
          <textarea id={challengeId} value={biggestChallenge} onChange={e => setBiggestChallenge(e.target.value)}
            placeholder="Optional"
            disabled={loading} rows={3} className={`${inputClass} resize-none`} />
        </div>
      </Step>

      <Step number={5} title="Fit & timing">
        <div className="flex flex-col gap-1.5">
          <span className={labelClass} id={`${urgencyId}-label`}>Are you actively looking for something like this right now?</span>
          <div role="radiogroup" aria-labelledby={`${urgencyId}-label`} className="flex flex-wrap gap-2">
            {URGENCY_OPTIONS.map(opt => (
              <OptionChip key={opt} selected={urgency === opt} disabled={loading} onClick={() => setUrgency(opt)}>
                {opt}
              </OptionChip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={demoAvailabilityId} className={labelClass}>When's a good time to reach you for a quick demo call?</label>
          <input id={demoAvailabilityId} type="text" value={demoAvailability} onChange={e => setDemoAvailability(e.target.value)}
            placeholder="e.g. Weekday afternoons, IST" disabled={loading} className={inputClass} />
        </div>
      </Step>

      {error && <p role="alert" className="text-caption text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded-md font-semibold text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        {loading ? 'Submitting…' : 'Submit'}
      </button>

      <p className="text-center text-text-tertiary text-caption">No spam. Ever.</p>
    </form>
  )
}
