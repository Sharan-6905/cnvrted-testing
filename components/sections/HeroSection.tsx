'use client'

import { useState, useId, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { HeroEntrance, HeroItem } from '@/components/motion/HeroEntrance'
import { HeroVisual } from '@/components/sections/HeroVisual'
import { HERO, CLOSING_CTA } from '@/content/copy'
import { HERO_DELAYS, DURATION, EASE } from '@/lib/tokens'
import { formSuccess } from '@/lib/motion'

// ─── Email validation ─────────────────────────────────────────────────────────

function isValidEmail(value: string): boolean {
  // RFC 5322-ish — validates format and presence of a dot in domain
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

// ─── WaitlistForm ─────────────────────────────────────────────────────────────

interface WaitlistFormProps {
  onSuccess: () => void
}

function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const emailId = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleBlur() {
    if (email && !isValidEmail(email)) {
      setError(CLOSING_CTA.error.invalidEmail)
    } else {
      setError(null)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot check — bots fill this, humans don't see it
    if (data.get(CLOSING_CTA.form.honeypotName)) return

    if (!isValidEmail(email)) {
      setError(CLOSING_CTA.error.invalidEmail)
      return
    }

    setError(null)
    setLoading(true)
    // TODO: wire up Supabase submission
    setTimeout(() => {
      setLoading(false)
      onSuccess()
    }, 600)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Join the CNVRTED waitlist"
    >
      {/* Honeypot — hidden from visual users via CSS, not display:none (bots ignore CSS) */}
      <input
        type="text"
        name={CLOSING_CTA.form.honeypotName}
        defaultValue=""
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
      />

      <div className="flex flex-col gap-md">
        <div className="flex flex-col sm:flex-row gap-sm">
          <div className="flex flex-col gap-xs flex-1 min-w-0">
            <label htmlFor={emailId} className="sr-only">
              {CLOSING_CTA.form.label}
            </label>
            <input
              id={emailId}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              placeholder={CLOSING_CTA.form.placeholder}
              autoComplete="email"
              required
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? `${emailId}-error` : undefined}
              disabled={loading}
              className={[
                'w-full rounded-md border bg-surface px-4 py-3',
                'text-body text-text-primary placeholder:text-text-tertiary',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors duration-[200ms]',
                error
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-border hover:border-text-tertiary',
              ]
                .filter(Boolean)
                .join(' ')}
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="shrink-0 sm:self-start"
          >
            {HERO.cta}
          </Button>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${emailId}-error`}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE.default } }}
              exit={{ opacity: 0, y: -4, transition: { duration: DURATION.fast } }}
              className="text-caption text-red-500 dark:text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Microcopy — visible when no error */}
        {!error && (
          <p className="text-caption text-text-tertiary">{HERO.microcopy}</p>
        )}
      </div>
    </form>
  )
}

// ─── SuccessState ─────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <motion.div
      variants={formSuccess}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-xs"
    >
      <p className="text-body font-medium text-text-primary">{CLOSING_CTA.success.heading}</p>
      <p className="text-body text-text-secondary">{CLOSING_CTA.success.body}</p>
    </motion.div>
  )
}

// ─── HeroSection ──────────────────────────────────────────────────────────────

interface HeroSectionProps {
  /** Pre-sets success state (for preview/testing). */
  forceSuccess?: boolean
}

export function HeroSection({ forceSuccess = false }: HeroSectionProps) {
  const [submitted, setSubmitted] = useState(forceSuccess)

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[100svh] flex items-center bg-background"
    >
      <Container className="w-full py-2xl">
        <div
          className={[
            'grid gap-3xl',
            // Mobile: single column (text → visual)
            // md (768px): single column but more spacious
            // lg (1024px): two-column grid
            'grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]',
            'items-center',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {/* ── Left: Text content ── */}
          <HeroEntrance className="flex flex-col gap-xl max-w-[560px]">
            {/* Eyebrow / section label */}
            <HeroItem delay={HERO_DELAYS.eyebrow}>
              <SectionLabel>{HERO.eyebrow}</SectionLabel>
            </HeroItem>

            {/* Headline — id="hero-headline" triggers nav scroll detection */}
            <HeroItem delay={HERO_DELAYS.headline}>
              <h1
                id="hero-headline"
                className="text-display-fluid font-sans font-semibold text-text-primary tracking-tight"
                style={{ whiteSpace: 'pre-line' }}
              >
                {HERO.headline}
              </h1>
            </HeroItem>

            {/* Subheadline */}
            <HeroItem delay={HERO_DELAYS.subheadline}>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                {HERO.subheadline}
              </p>
            </HeroItem>

            {/* Form / success state */}
            <HeroItem delay={HERO_DELAYS.form} className="w-full">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessState key="success" />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: DURATION.fast } }}
                  >
                    <WaitlistForm onSuccess={() => setSubmitted(true)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </HeroItem>
          </HeroEntrance>

          {/* ── Right: Hero visual ── */}
          <HeroItem
            delay={HERO_DELAYS.visual}
            fadeOnly
            className="w-full"
          >
            <HeroVisual />
          </HeroItem>
        </div>
      </Container>
    </section>
  )
}
