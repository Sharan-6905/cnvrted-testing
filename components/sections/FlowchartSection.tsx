'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  {
    id: 'sources',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 1 0 20M12 2a14.5 14.5 0 0 0 0 20M2 12h20" />
      </svg>
    ),
    label: 'Dark Funnel Sources',
    sublabel: 'Step 1',
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.25)',
    description: 'CNVRTED continuously monitors LinkedIn, Reddit, X, news outlets, job boards, and 50+ public signals — all in real time.',
    tags: ['LinkedIn', 'Reddit', 'X', 'News', 'Job boards'],
  },
  {
    id: 'detect',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
    label: 'Signal Detection',
    sublabel: 'Step 2',
    color: '#0B6B66',
    bg: 'rgba(11,107,102,0.08)',
    border: 'rgba(11,107,102,0.25)',
    description: 'Our AI identifies 4 buying signal types — Hiring, Funding, Tech Change, and Pain Signals — and filters out noise automatically.',
    tags: ['HIRING', 'FUNDING', 'TECH CHANGE', 'PAIN SIGNAL'],
  },
  {
    id: 'score',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    label: 'Intent Scoring',
    sublabel: 'Step 3',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.08)',
    border: 'rgba(217,119,6,0.25)',
    description: 'Every account gets a 0–100 intent score based on recency, signal strength, and ICP fit. HIGH scores mean engage now.',
    tags: ['Score 0–100', 'ICP fit', 'Recency', 'Urgency rank'],
  },
  {
    id: 'enrich',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: 'Enriched Context',
    sublabel: 'Step 4',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.25)',
    description: 'Each signal comes with full context — company size, decision maker, why they are in-market, and a suggested outreach angle.',
    tags: ['Company data', 'Decision maker', 'Why now', 'Outreach angle'],
  },
  {
    id: 'crm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    label: 'Push to Your CRM',
    sublabel: 'Step 5',
    color: '#0B6B66',
    bg: 'rgba(11,107,102,0.08)',
    border: 'rgba(11,107,102,0.25)',
    description: 'Signals flow directly into Salesforce, HubSpot, Outreach, or Apollo — so your reps see them where they already work.',
    tags: ['Salesforce', 'HubSpot', 'Outreach', 'Apollo'],
  },
]

export function FlowchartSection() {
  const [active, setActive] = useState<string | null>(null)
  const activeStep = STEPS.find(s => s.id === active)

  return (
    <section className="py-20 md:py-28 bg-background" aria-label="How CNVRTED works">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-3">
            THE PROCESS
          </p>
          <h2 className="text-h2 text-text-primary font-semibold">
            From dark funnel to pipeline.<br className="hidden md:block" /> In minutes.
          </h2>
        </motion.div>

        {/* Flow nodes */}
        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-0">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex flex-col md:flex-row items-center w-full md:w-auto md:flex-1">

              {/* Node */}
              <motion.button
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => setActive(active === step.id ? null : step.id)}
                className="relative flex flex-col items-center gap-3 p-1 w-full md:w-auto focus:outline-none group"
              >
                {/* Icon circle */}
                <motion.div
                  animate={{
                    boxShadow: active === step.id
                      ? `0 0 0 4px ${step.border}, 0 8px 24px ${step.bg}`
                      : '0 0 0 0px transparent',
                    scale: active === step.id ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors duration-200"
                  style={{
                    backgroundColor: active === step.id ? step.bg : 'var(--color-surface)',
                    borderColor: active === step.id ? step.border : 'var(--color-border)',
                    color: active === step.id ? step.color : 'var(--color-text-secondary)',
                  }}
                >
                  {step.icon}
                </motion.div>

                {/* Label */}
                <div className="text-center">
                  <p className="text-caption font-mono uppercase tracking-widest mb-0.5"
                    style={{ color: active === step.id ? step.color : 'var(--color-text-tertiary)', fontSize: 10 }}>
                    {step.sublabel}
                  </p>
                  <p className="text-body font-medium text-text-primary text-sm leading-tight max-w-[100px] text-center">
                    {step.label}
                  </p>
                </div>

                {/* Active indicator dot */}
                <motion.div
                  animate={{ opacity: active === step.id ? 1 : 0, scale: active === step.id ? 1 : 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: step.color }}
                />
              </motion.button>

              {/* Connector — not after last */}
              {i < STEPS.length - 1 && (
                <div className="flex flex-col md:flex-row items-center justify-center md:flex-1 py-2 md:py-0 md:px-2">
                  {/* Vertical on mobile, horizontal on desktop */}
                  <div className="flex md:hidden flex-col items-center gap-1">
                    {[0,1,2].map(d => (
                      <motion.div
                        key={d}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + d * 0.06 }}
                        className="w-px h-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-border)' }}
                      />
                    ))}
                  </div>
                  <div className="hidden md:flex flex-row items-center gap-1">
                    {[0,1,2,3].map(d => (
                      <motion.div
                        key={d}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + d * 0.06 }}
                        className="w-2 h-px rounded-full"
                        style={{ backgroundColor: 'var(--color-border)' }}
                      />
                    ))}
                    <svg width="8" height="8" viewBox="0 0 8 8" className="text-border flex-shrink-0" style={{ color: 'var(--color-border)' }}>
                      <path d="M0 4h6M4 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {activeStep && (
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="mt-10 rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start"
              style={{
                backgroundColor: activeStep.bg,
                borderColor: activeStep.border,
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: activeStep.color + '20', color: activeStep.color }}
                  >
                    {activeStep.icon}
                  </div>
                  <p className="font-semibold text-text-primary">{activeStep.label}</p>
                </div>
                <p className="text-body text-text-secondary leading-relaxed">{activeStep.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:min-w-[200px]">
                {activeStep.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-caption font-mono px-3 py-1 rounded-full border text-sm"
                    style={{ borderColor: activeStep.border, color: activeStep.color, backgroundColor: 'transparent' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!active && (
          <p className="text-center text-caption text-text-tertiary mt-8">
            Click any step to learn more
          </p>
        )}
      </div>
    </section>
  )
}
