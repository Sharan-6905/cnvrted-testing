import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works - CNVRTED',
  description: 'From dark funnel to pipeline in four steps. See how CNVRTED detects, scores, enriches, and delivers buying signals to your team.',
}

const STEPS = [
  {
    number: '01',
    label: 'Detect',
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.06)',
    border: 'rgba(99,102,241,0.2)',
    headline: 'We monitor signals you cannot see',
    body: 'CNVRTED runs a continuous scan across LinkedIn, Reddit, X, job boards, news outlets, press releases, G2 reviews, and 50+ public data sources. Not a one-time export — always-on intelligence that runs in the background while your team focuses on selling.',
    details: [
      { label: 'Sources monitored', value: '50+' },
      { label: 'Update frequency', value: 'Continuous' },
      { label: 'Signal types detected', value: '4 categories' },
      { label: 'Coverage', value: 'Global' },
    ],
  },
  {
    number: '02',
    label: 'Match',
    color: '#0B6B66',
    bg: 'rgba(11,107,102,0.06)',
    border: 'rgba(11,107,102,0.2)',
    headline: 'Every signal matched to your ICP',
    body: 'Raw signals are filtered against your Ideal Customer Profile — industry, company size, geography, tech stack, and buyer persona. Only signals that match your ICP reach your feed. No noise, no irrelevant alerts. Just accounts that fit and are showing intent.',
    details: [
      { label: 'ICP dimensions', value: 'Industry, size, geo, tech' },
      { label: 'Filtering', value: 'Pre-delivery' },
      { label: 'Customization', value: 'Per-team settings' },
      { label: 'False positive rate', value: 'Minimized by design' },
    ],
  },
  {
    number: '03',
    label: 'Score',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.06)',
    border: 'rgba(217,119,6,0.2)',
    headline: 'Intent scored 0–100. Prioritized for your reps',
    body: 'Each matched account receives an intent score based on three factors: recency of the signal, strength of the buying indicator, and ICP fit percentage. HIGH scores mean engage today. MEDIUM means monitor. The score is always explainable — no black boxes.',
    details: [
      { label: 'Score range', value: '0 – 100' },
      { label: 'Scoring factors', value: 'Recency, strength, ICP fit' },
      { label: 'Intent tiers', value: 'HIGH / MEDIUM / LOW' },
      { label: 'Explainability', value: 'Always shown' },
    ],
  },
  {
    number: '04',
    label: 'Context',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.06)',
    border: 'rgba(124,58,237,0.2)',
    headline: 'Not just a flag — a full brief',
    body: 'Each surfaced account includes the full context your rep needs to open a conversation: what signal triggered it, why it matters, who to contact, and a suggested outreach angle. No research required. The brief is ready the moment the signal is detected.',
    details: [
      { label: 'Signal explanation', value: 'Included' },
      { label: 'Decision maker', value: 'Identified' },
      { label: 'Outreach angle', value: 'Suggested' },
      { label: 'Company context', value: 'Attached' },
    ],
  },
  {
    number: '05',
    label: 'Action',
    color: '#0B6B66',
    bg: 'rgba(11,107,102,0.06)',
    border: 'rgba(11,107,102,0.2)',
    headline: 'Signals live where your team works',
    body: 'CNVRTED pushes enriched accounts directly to your CRM or sales engagement tool. Signals become tasks, new records, or sequences — whatever your workflow requires. No new dashboard for reps to check. The signal arrives in the tools they already open every morning.',
    details: [
      { label: 'Salesforce', value: 'Native sync' },
      { label: 'HubSpot', value: 'Native sync' },
      { label: 'Outreach / Apollo', value: 'Native sync' },
      { label: 'Slack', value: 'Real-time alerts' },
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main className="bg-background pt-24">

        {/* Hero */}
        <section className="py-20 md:py-28 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="max-w-[760px]">
              <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">
                HOW IT WORKS
              </p>
              <h1 className="text-display-fluid font-semibold text-text-primary leading-tight mb-6">
                From dark funnel<br />to pipeline in minutes.
              </h1>
              <p className="text-body-lg text-text-secondary leading-relaxed max-w-[580px]">
                Five steps from signal detection to rep action. No manual research, no guessing, no cold lists.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        {STEPS.map((step, i) => (
          <section key={step.number} className="py-20 md:py-24 border-b border-border">
            <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

                {/* Left: content */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="font-mono text-sm font-medium px-3 py-1 rounded-full"
                      style={{ color: step.color, backgroundColor: step.bg, border: `1px solid ${step.border}` }}
                    >
                      {step.number}
                    </span>
                    <span
                      className="text-caption font-mono uppercase tracking-widest"
                      style={{ color: step.color, fontSize: 11 }}
                    >
                      {step.label}
                    </span>
                  </div>
                  <h2 className="text-h2 font-semibold text-text-primary mb-5 leading-tight">{step.headline}</h2>
                  <p className="text-body text-text-secondary leading-relaxed max-w-[540px]">{step.body}</p>
                </div>

                {/* Right: detail card */}
                <div
                  className="rounded-2xl border p-6 flex flex-col gap-4"
                  style={{ borderColor: step.border, backgroundColor: step.bg }}
                >
                  {step.details.map((d) => (
                    <div key={d.label} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0" style={{ borderColor: step.border }}>
                      <span className="text-body text-text-secondary" style={{ fontSize: 13 }}>{d.label}</span>
                      <span className="text-body font-medium" style={{ fontSize: 13, color: step.color }}>{d.value}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20 text-center">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">See it for yourself.</h2>
            <p className="text-body text-text-secondary mb-10 max-w-[420px] mx-auto leading-relaxed">
              Join the waitlist and be first to access real-time buying signals for your pipeline.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-body font-semibold text-white transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: '#0B6B66' }}
            >
              Join the waitlist
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
