import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product - CNVRTED',
  description: 'CNVRTED monitors the dark funnel across LinkedIn, Reddit, X, and the open web to surface accounts showing real buying signals in real time.',
}

const FEATURES = [
  {
    eyebrow: 'DARK FUNNEL MONITORING',
    title: 'Always-on signal detection',
    body: 'CNVRTED runs continuously in the background, scanning LinkedIn, Reddit, X, job boards, news outlets, and 50+ public data sources. No manual research. No batch exports. Live intelligence.',
    points: ['LinkedIn hiring patterns', 'Reddit community mentions', 'X (Twitter) brand signals', 'News & press releases', 'Job board intelligence', 'G2 / Capterra reviews'],
    color: '#6366F1',
  },
  {
    eyebrow: 'INTENT SCORING',
    title: 'Every account scored 0–100',
    body: 'Raw signals are noisy. CNVRTED applies an intent scoring model that weights each signal by recency, strength, and ICP fit — so your reps know exactly where to start their day.',
    points: ['Recency weighting', 'Signal strength calibration', 'ICP fit scoring', 'Urgency ranking', 'HIGH / MEDIUM / LOW tiers', 'Explainable scores'],
    color: '#D97706',
  },
  {
    eyebrow: 'ENRICHED CONTEXT',
    title: 'Not just a flag — a full brief',
    body: 'Each surfaced account comes with everything a rep needs to open a conversation: why the account showed up, who to reach, the signal that triggered it, and a suggested outreach angle.',
    points: ['Trigger explanation', 'Decision maker identified', 'Suggested angle', 'Company context', 'Signal timeline', 'One-line pitch'],
    color: '#0B6B66',
  },
  {
    eyebrow: 'CRM INTEGRATION',
    title: 'Signals where your team works',
    body: 'CNVRTED pushes enriched accounts directly to your CRM. Signals become tasks, sequences, or new records — depending on what your workflow needs. No new dashboard for reps to check.',
    points: ['Salesforce', 'HubSpot', 'Outreach', 'Apollo', 'Salesloft', 'Slack alerts'],
    color: '#7C3AED',
  },
]

const SIGNAL_TYPES = [
  {
    tag: 'HIRING',
    color: '#0B6B66',
    bg: 'rgba(11,107,102,0.06)',
    example: 'Posted 8 Sales Engineer roles in 10 days',
    why: 'New headcount signals budget, new initiatives, and tools to support them.',
  },
  {
    tag: 'FUNDING',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.06)',
    example: 'Closed a $40M Series B with GTM expansion cited',
    why: '90-day window of infrastructure spend opens immediately after a round closes.',
  },
  {
    tag: 'TECH CHANGE',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.06)',
    example: 'Removed HubSpot from 6 open roles in 2 weeks',
    why: 'Migration signals are buying signals for every tool in the new stack.',
  },
  {
    tag: 'PAIN SIGNAL',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.06)',
    example: 'VP Sales posted about pipeline visibility on LinkedIn',
    why: 'Public pain creates internal urgency — and urgency creates conversations.',
  },
]

export default function ProductPage() {
  return (
    <>
      <Nav />
      <main className="bg-background pt-24">

        {/* Hero */}
        <section className="py-20 md:py-28 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="max-w-[760px]">
              <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">
                THE PRODUCT
              </p>
              <h1 className="text-display-fluid font-semibold text-text-primary leading-tight mb-6">
                Real-time buying signals.<br />For every account in your CRM.
              </h1>
              <p className="text-body-lg text-text-secondary leading-relaxed max-w-[580px]">
                CNVRTED monitors the dark funnel continuously and surfaces accounts that are actually in-market — with full context on why, who to reach, and what to say.
              </p>
            </div>
          </div>
        </section>

        {/* Signal types */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">SIGNAL TYPES</p>
            <h2 className="text-h2 font-semibold text-text-primary mb-12 max-w-[560px] leading-tight">
              Four types of intent. All pointing to one thing.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SIGNAL_TYPES.map((s) => (
                <div key={s.tag} className="rounded-2xl border p-6 flex flex-col gap-4" style={{ borderColor: s.color + '30', backgroundColor: s.bg }}>
                  <span
                    className="inline-block self-start text-caption font-mono uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ fontSize: 10, color: s.color, backgroundColor: s.color + '15' }}
                  >
                    {s.tag}
                  </span>
                  <div>
                    <p className="text-body font-semibold text-text-primary mb-1" style={{ fontSize: 14 }}>
                      &ldquo;{s.example}&rdquo;
                    </p>
                    <p className="text-body text-text-secondary" style={{ fontSize: 13 }}>{s.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature deep-dives */}
        {FEATURES.map((f, i) => (
          <section key={f.eyebrow} className={`py-20 md:py-24 border-b border-border ${i % 2 === 1 ? 'bg-surface' : 'bg-background'}`}>
            <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <p className="text-caption font-mono uppercase tracking-[0.08em] mb-4" style={{ color: f.color, fontSize: 10 }}>
                    {f.eyebrow}
                  </p>
                  <h2 className="text-h2 font-semibold text-text-primary mb-5 leading-tight">{f.title}</h2>
                  <p className="text-body text-text-secondary leading-relaxed">{f.body}</p>
                </div>
                <div className={`rounded-2xl border border-border bg-surface p-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="grid grid-cols-2 gap-3">
                    {f.points.map((point) => (
                      <div key={point} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: f.color }} />
                        <span className="text-body text-text-secondary" style={{ fontSize: 13 }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20 text-center">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">Ready to see CNVRTED?</h2>
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
