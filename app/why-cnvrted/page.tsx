import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why CNVRTED - Intent over everything',
  description: 'Static lead databases tell you who fits your ICP. CNVRTED tells you who is ready to buy right now and exactly why.',
}

const COMPARISONS = [
  { left: 'Who fits my ICP?', right: 'Who is in-market right now?' },
  { left: 'Static contact records', right: 'Live buying signals' },
  { left: 'Updated periodically', right: 'Continuously monitored' },
  { left: 'A list to dial through', right: 'A prioritized opportunity feed' },
  { left: 'Volume — more contacts', right: 'Timing — right moment' },
  { left: 'More data = more pipeline', right: 'Right signal = more pipeline' },
]

const SIGNALS = [
  {
    label: 'HIRING',
    color: '#0B6B66',
    bg: 'rgba(11,107,102,0.06)',
    title: 'Hiring activity',
    body: 'A company posting 12 AE roles is not a lead — it is a signal. New headcount means new initiatives, new budget, and a sales motion that needs tools to back it up.',
  },
  {
    label: 'FUNDING',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.06)',
    title: 'Funding events',
    body: 'A Series B close means 90 days of infrastructure spend. The window to reach the right buyer before the budget is committed is narrow — and CNVRTED tells you the moment it opens.',
  },
  {
    label: 'TECH CHANGE',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.06)',
    title: 'Tech stack changes',
    body: 'Migrating off Segment, dropping Salesforce, adopting a new data warehouse — these are buying signals for every tool in the new stack. Timing is everything.',
  },
  {
    label: 'PAIN SIGNAL',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.06)',
    title: 'Pain signals',
    body: 'When customers vent on Reddit, G2, or LinkedIn, the internal team feels it. That friction creates urgency — and urgency creates conversations that actually convert.',
  },
]

const AUDIENCE = [
  {
    role: 'RevOps & GTM Operations',
    pain: 'You run the stack. You know the CRM data is stale. You know reps are dialing contacts that have shown no signal in months. CNVRTED gives you a defensible, explainable reason for every account in the pipeline.',
    fit: ['Signal quality', 'CRM integration', 'ICP control', 'Defensible logic'],
  },
  {
    role: 'Sales Leaders & SDR Managers',
    pain: 'Your team is burning hours on cold outreach that does not land. Low reply rates are not a messaging problem — they are a timing problem. CNVRTED surfaces accounts that are already moving.',
    fit: ['Rep productivity', 'Reply rates', 'Pipeline output', 'Shorter cycles'],
  },
]

export default function WhyCNVRTEDPage() {
  return (
    <>
      <Nav />
      <main className="bg-background pt-24">

        {/* Hero */}
        <section className="py-20 md:py-28 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="max-w-[720px]">
              <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">
                WHY CNVRTED
              </p>
              <h1 className="text-display-fluid font-semibold text-text-primary leading-tight mb-6">
                Intent over everything.
              </h1>
              <p className="text-body-lg text-text-secondary leading-relaxed mb-8 max-w-[560px]">
                Every company in your CRM fits your ICP. Almost none of them are ready to buy right now. CNVRTED shows you which ones are — and exactly why, today.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-body font-medium text-white transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: '#0B6B66' }}
              >
                Join the waitlist
              </a>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">THE PROBLEM</p>
                <h2 className="text-h2 font-semibold text-text-primary mb-5 leading-tight">
                  Your database knows who.<br />It has no idea when.
                </h2>
                <p className="text-body text-text-secondary leading-relaxed mb-4">
                  Apollo, ZoomInfo, and Cognism answer one question: who fits my ICP? They hand you a list of contacts — name, title, email — that matched a filter. That list looks the same today as it did six months ago.
                </p>
                <p className="text-body text-text-secondary leading-relaxed">
                  Companies are in-market because something happened — a funding round, a leadership change, a tech migration, a public complaint. The database does not know about any of it.
                </p>
              </div>
              <div className="rounded-2xl border border-border overflow-hidden">
                <div className="grid grid-cols-2 border-b border-border bg-surface">
                  <div className="px-5 py-3 border-r border-border">
                    <p className="text-caption font-mono text-text-tertiary uppercase tracking-widest" style={{ fontSize: 10 }}>Lead databases ask</p>
                  </div>
                  <div className="px-5 py-3">
                    <p className="text-caption font-mono uppercase tracking-widest" style={{ fontSize: 10, color: '#0B6B66' }}>CNVRTED asks</p>
                  </div>
                </div>
                {COMPARISONS.map((row, i) => (
                  <div key={i} className={`grid grid-cols-2 bg-surface ${i < COMPARISONS.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="px-5 py-3 border-r border-border">
                      <span className="text-body text-text-secondary" style={{ fontSize: 13 }}>{row.left}</span>
                    </div>
                    <div className="px-5 py-3">
                      <span className="text-body font-medium" style={{ fontSize: 13, color: '#0B6B66' }}>{row.right}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Signal types */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">WHAT WE DETECT</p>
            <h2 className="text-h2 font-semibold text-text-primary mb-12 max-w-[560px] leading-tight">
              Four signal types. All pointing to one thing — timing.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SIGNALS.map((s) => (
                <div key={s.title} className="rounded-2xl border p-6" style={{ borderColor: s.color + '30', backgroundColor: s.bg }}>
                  <span
                    className="inline-block text-caption font-mono uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                    style={{ fontSize: 10, color: s.color, backgroundColor: s.color + '15' }}
                  >
                    {s.label}
                  </span>
                  <h3 className="text-body font-semibold text-text-primary mb-2">{s.title}</h3>
                  <p className="text-body text-text-secondary leading-relaxed" style={{ fontSize: 14 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it is for */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">WHO IT IS FOR</p>
            <h2 className="text-h2 font-semibold text-text-primary mb-12 leading-tight">
              Built for modern revenue teams.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {AUDIENCE.map((a) => (
                <div key={a.role} className="rounded-2xl border border-border p-8 bg-surface flex flex-col gap-5">
                  <div>
                    <h3 className="text-body font-semibold text-text-primary mb-3">{a.role}</h3>
                    <p className="text-body text-text-secondary leading-relaxed" style={{ fontSize: 14 }}>{a.pain}</p>
                  </div>
                  <div>
                    <p className="text-caption font-mono uppercase tracking-widest text-text-tertiary mb-2" style={{ fontSize: 10 }}>What matters most</p>
                    <div className="flex flex-wrap gap-2">
                      {a.fit.map(f => (
                        <span key={f} className="text-caption px-2.5 py-1 rounded-full border border-border text-text-secondary" style={{ fontSize: 12 }}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The mechanism */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">HOW IT WORKS</p>
                <h2 className="text-h2 font-semibold text-text-primary mb-6 leading-tight">
                  Signal. Match. Context. Action.
                </h2>
                <p className="text-body text-text-secondary leading-relaxed mb-4">
                  CNVRTED continuously reads public sources — LinkedIn, Reddit, X, hiring pages, funding announcements, product forums. When a buying signal is detected, it is matched against your ICP and scored for urgency and relevance.
                </p>
                <p className="text-body text-text-secondary leading-relaxed mb-4">
                  The result is a prioritized account with full context — why they showed up, what signal triggered it, who to reach, and what to say. Every output is explainable to your VP of Sales in one sentence.
                </p>
                <p className="text-body text-text-secondary leading-relaxed">
                  From there, the signal syncs to your CRM — Salesforce, HubSpot, Outreach, Apollo — so it lives where your team already works.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { n: '01', label: 'Detect', desc: 'Monitor 50+ public signals in real time across LinkedIn, Reddit, X, job boards, and the open web.' },
                  { n: '02', label: 'Match', desc: 'Every signal is matched against your ICP definition and scored 0-100 for relevance and urgency.' },
                  { n: '03', label: 'Context', desc: 'Surfaced accounts come with the full story — why now, who to reach, and what angle to use.' },
                  { n: '04', label: 'Action', desc: 'Push to Salesforce, HubSpot, Outreach, or Apollo. The signal lives where your team already works.' },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-4 rounded-xl border border-border bg-surface px-5 py-4">
                    <span className="font-mono text-text-tertiary shrink-0 mt-0.5" style={{ fontSize: 12 }}>{step.n}</span>
                    <div>
                      <p className="text-body font-semibold text-text-primary mb-1">{step.label}</p>
                      <p className="text-body text-text-secondary" style={{ fontSize: 14 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20 text-center">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">Ready to sell on timing?</h2>
            <p className="text-body text-text-secondary mb-10 max-w-[420px] mx-auto leading-relaxed">
              Join the waitlist and be first to know when CNVRTED opens. No spam. Ever.
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
