'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HERO } from '@/content/copy'
import { EASE } from '@/lib/tokens'

/**
 * Living visualization for the hero: signals stream in from multiple sources,
 * converge on a central AI engine, assemble into a company profile, resolve
 * into a scored Intent Card, and sync to a CRM — looping continuously.
 *
 * The whole sequence is timer-orchestrated (not scroll- or interaction-driven)
 * so it reads as "always on" — the product is depicted as something that
 * runs in the background, not a static illustration.
 */

const SOURCES = [
  { key: 'linkedin', label: 'LinkedIn', icon: 'in' },
  { key: 'news', label: 'News', icon: 'N' },
  { key: 'funding', label: 'Funding', icon: '$' },
  { key: 'hiring', label: 'Hiring', icon: 'H' },
  { key: 'website', label: 'Website', icon: 'W' },
  { key: 'reddit', label: 'Reddit', icon: 'R' },
  { key: 'techchange', label: 'Tech change', icon: 'T' },
] as const

// Salesforce cloud mark (same glyph as IntegrationsSection's SalesforceLogo, sized for a compact chip)
function SalesforceMark() {
  return (
    <svg viewBox="0 0 24 17" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ height: 13, width: 'auto', display: 'block' }}>
      <path
        fill="#00A1E0"
        d="M10 1.8a5.1 5.1 0 0 1 3.1-.9c1.6 0 3 .9 3.7 2.1a5.3 5.3 0 0 1 2.1-.4c2.9 0 5.3 2.4 5.3 5.3s-2.4 5.3-5.3 5.3c-.3 0-.7 0-1-.1a3.3 3.3 0 0 1-3.3 1.9 3.3 3.3 0 0 1-1.6-.4 3.8 3.8 0 0 1-3.8 2.4 3.9 3.9 0 0 1-3.9-2.6H5a5.3 5.3 0 0 1 0-10.6c.6 0 1.1.1 1.6.3A4.6 4.6 0 0 1 10 1.8z"
      />
    </svg>
  )
}

// HubSpot sprocket mark: ring + two nodes, orange brand color
function HubSpotMark() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ height: 13, width: 13, display: 'block' }}>
      <circle cx="17.5" cy="5.5" r="2.6" fill="#FF7A59" />
      <circle cx="6.5" cy="9" r="2.2" fill="#FF7A59" />
      <circle cx="13.5" cy="17.5" r="4.3" fill="none" stroke="#FF7A59" strokeWidth="2.1" />
      <line x1="16.1" y1="7.4" x2="8.3" y2="10.6" stroke="#FF7A59" strokeWidth="1.8" />
      <line x1="13.5" y1="13.2" x2="13.5" y2="7.2" stroke="#FF7A59" strokeWidth="1.8" />
    </svg>
  )
}

const CRM_TARGETS = [
  { key: 'salesforce', label: 'Salesforce', Mark: SalesforceMark },
  { key: 'hubspot', label: 'HubSpot', Mark: HubSpotMark },
] as const

type Phase = 'collecting' | 'combining' | 'profile' | 'score' | 'sync' | 'reset'

const ORB_LABEL: Record<Phase, string> = {
  collecting: 'Listening for signals',
  combining: 'Detecting intent',
  profile: 'Building profile',
  score: 'Intent scored',
  sync: 'Syncing to CRM',
  reset: 'Listening for signals',
}

interface Particle {
  id: number
  start: { x: number; y: number }
  mid: { x: number; y: number }
  end: { x: number; y: number }
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export function LiveSignalPipeline({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<(HTMLDivElement | null)[]>([])
  const orbRef = useRef<HTMLDivElement>(null)
  const particleId = useRef(0)

  const [phase, setPhase] = useState<Phase>('collecting')
  const [activeSource, setActiveSource] = useState<number | null>(null)
  const [pulsing, setPulsing] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [score, setScore] = useState(0)

  function spawnParticle(sourceIndex: number) {
    const container = containerRef.current
    const chip = chipRefs.current[sourceIndex]
    const orb = orbRef.current
    if (!container || !chip || !orb) return

    const containerRect = container.getBoundingClientRect()
    const chipRect = chip.getBoundingClientRect()
    const orbRect = orb.getBoundingClientRect()

    const start = {
      x: chipRect.left + chipRect.width / 2 - containerRect.left,
      y: chipRect.top + chipRect.height / 2 - containerRect.top,
    }
    const end = {
      x: orbRect.left + orbRect.width / 2 - containerRect.left,
      y: orbRect.top + orbRect.height / 2 - containerRect.top,
    }
    const mid = { x: (start.x + end.x) / 2, y: start.y + (end.y - start.y) * 0.35 }

    const id = particleId.current++
    setParticles((prev) => [...prev, { id, start, mid, end }])
  }

  function removeParticle(id: number) {
    setParticles((prev) => prev.filter((p) => p.id !== id))
  }

  function animateScore() {
    const duration = 900
    const start = performance.now()
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setScore(Math.round(eased * 92))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  useEffect(() => {
    let active = true
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      // Static end-state only — no timers, no particles.
      setPhase('score')
      setScore(92)
      return
    }

    async function runCycle() {
      while (active) {
        // ── Collecting: signals arrive from each source in turn ──
        setPhase('collecting')
        for (let i = 0; i < SOURCES.length; i++) {
          if (!active) return
          setActiveSource(i)
          spawnParticle(i)
          await wait(550)
        }
        if (!active) return
        setActiveSource(null)
        await wait(500) // let the last particle finish traveling

        // ── Combining: the AI engine pulses as it merges signals ──
        if (!active) return
        setPhase('combining')
        setPulsing(true)
        await wait(500)
        setPulsing(false)
        await wait(400)

        // ── Profile: a company profile assembles from the merged signals ──
        if (!active) return
        setPhase('profile')
        await wait(1100)

        // ── Score: profile resolves into a scored Intent Card ──
        if (!active) return
        setScore(0)
        setPhase('score')
        animateScore()
        await wait(1700)

        // ── Sync: the card slides into the CRM ──
        if (!active) return
        setPhase('sync')
        await wait(900)
        await wait(600)

        // ── Reset: clear the stage before looping ──
        if (!active) return
        setPhase('reset')
        await wait(600)
      }
    }

    runCycle()
    return () => {
      active = false
    }
  }, [])

  const showProfile = phase === 'profile'
  const showIntentCard = phase === 'score' || phase === 'sync'

  return (
    <div
      ref={containerRef}
      className={['relative w-full overflow-hidden rounded-2xl border border-border bg-surface/40', className]
        .filter(Boolean)
        .join(' ')}
      style={{ height: 'clamp(520px, 60vh, 600px)' }}
      aria-hidden="true"
      role="presentation"
    >
      <span className="sr-only">{HERO.visualDescription}</span>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 28%, var(--color-accent-dim), transparent 60%)' }}
      />

      {/* Source chips */}
      <div className="relative z-10 px-5 pt-6">
        <div className="flex flex-wrap justify-center gap-1.5">
          {SOURCES.map((s, i) => (
            <div
              key={s.key}
              ref={(el) => {
                chipRefs.current[i] = el
              }}
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 transition-colors duration-300"
              style={{
                borderColor: activeSource === i ? 'var(--color-accent)' : 'var(--color-border)',
                backgroundColor: activeSource === i ? 'var(--color-accent-dim)' : 'var(--color-surface-raised)',
              }}
            >
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                style={{ color: activeSource === i ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
              >
                {s.icon}
              </span>
              <span className="text-[10px] whitespace-nowrap text-text-secondary">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Particle layer */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: p.start.x, y: p.start.y, opacity: 0, scale: 0.4 }}
              animate={{
                x: [p.start.x, p.mid.x, p.end.x],
                y: [p.start.y, p.mid.y, p.end.y],
                opacity: [0, 1, 1, 0],
                scale: [0.4, 1, 1, 0.5],
              }}
              transition={{ duration: 0.6, ease: EASE.default }}
              onAnimationComplete={() => removeParticle(p.id)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 6,
                height: 6,
                marginLeft: -3,
                marginTop: -3,
                borderRadius: 9999,
                background: 'var(--color-accent)',
                boxShadow: '0 0 8px 2px var(--color-accent)',
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* AI orb */}
      <div className="relative z-10 mt-6 flex flex-col items-center">
        <div
          ref={orbRef}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border"
          style={{ borderColor: 'var(--color-accent-dim)' }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border"
            style={{ borderStyle: 'dashed', borderColor: 'var(--color-accent-dim)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="h-8 w-8 rounded-full"
            style={{ background: 'var(--color-accent)' }}
            animate={
              pulsing
                ? { scale: [1, 1.25, 1], boxShadow: ['0 0 0px var(--color-accent)', '0 0 24px var(--color-accent)', '0 0 0px var(--color-accent)'] }
                : { scale: 1, boxShadow: '0 0 0px transparent' }
            }
            transition={{ duration: 0.5, ease: EASE.default }}
          />
        </div>
        <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
          {ORB_LABEL[phase]}
        </p>
      </div>

      {/* Card zone */}
      <div className="relative z-10 flex items-center justify-center px-6 pb-4 pt-4" style={{ minHeight: 200 }}>
        <AnimatePresence mode="wait">
          {showProfile && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
              transition={{ duration: 0.4, ease: EASE.default }}
              className="flex w-full max-w-[280px] flex-col gap-3 rounded-lg border border-border bg-surface-raised p-4"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-[11px] font-semibold text-text-tertiary">
                  {HERO.visualCompanyName[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-body font-semibold text-text-primary">{HERO.visualCompanyName}</p>
                  <p className="text-[10px] text-text-tertiary">Profile assembling…</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {SOURCES.slice(0, 4).map((s) => (
                  <motion.span
                    key={s.key}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="rounded px-1 py-0.5 text-[9px] font-bold uppercase text-text-tertiary"
                    style={{ border: '1px solid var(--color-border)' }}
                  >
                    {s.icon}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {showIntentCard && (
            <motion.div
              key="intent"
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={
                phase === 'sync'
                  ? { opacity: 0, y: 90, scale: 0.55, transition: { duration: 0.9, ease: EASE.default } }
                  : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE.default } }
              }
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="flex w-full max-w-[280px] flex-col gap-3 rounded-lg border-2 p-4"
              style={{ borderColor: 'var(--color-accent)', backgroundColor: 'var(--color-surface-raised)' }}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-md bg-accent-dim px-[0.625rem] py-xs text-[10px] font-mono leading-none text-accent">
                  FUNDING
                </span>
                <span className="text-[10px] text-text-tertiary">2m ago</span>
              </div>
              <div>
                <p className="text-body font-semibold text-text-primary">{HERO.visualCompanyName}</p>
                <p className="mt-0.5 text-caption text-text-secondary">$25M Series B announced. Expanding GTM</p>
              </div>
              <div className="flex items-center gap-1.5">
                {['in', 'N', 'R'].map((s) => (
                  <span
                    key={s}
                    className="rounded px-1 py-0.5 text-[9px] font-bold uppercase text-text-tertiary"
                    style={{ border: '1px solid var(--color-border)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-2">
                <span className="inline-flex items-center rounded-md bg-accent px-[0.625rem] py-xs text-[10px] font-mono leading-none text-on-accent">
                  HIGH INTENT
                </span>
                <span className="text-[1.4rem] font-bold leading-none tabular-nums text-text-primary">{score}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CRM row */}
      <div className="relative z-10 flex items-center justify-center gap-3 pb-5">
        {CRM_TARGETS.map(({ key, label, Mark }) => (
          <div
            key={key}
            className="relative flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 transition-colors duration-300"
            style={{ borderColor: phase === 'sync' ? 'var(--color-accent)' : 'var(--color-border)' }}
          >
            <Mark />
            <span className="text-[10px] font-semibold text-text-secondary">{label}</span>
            <AnimatePresence>
              {phase === 'sync' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE.default }}
                  className="text-[10px] text-accent"
                >
                  ✓
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
