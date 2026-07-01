import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - CNVRTED',
  description: 'CNVRTED is in private early access. Join the waitlist to be first when we open up.',
}

const INCLUDED = [
  'Real-time signal detection across 50+ sources',
  'HIRING, FUNDING, TECH CHANGE, and PAIN SIGNAL categories',
  'Intent scoring 0–100 per account',
  'ICP-matched filtering — no irrelevant noise',
  'Full context brief per surfaced account',
  'Decision maker identification',
  'Suggested outreach angles',
  'CRM sync (Salesforce, HubSpot, Outreach, Apollo)',
  'Slack real-time alerts',
  'Dedicated onboarding',
]

const FAQS = [
  {
    q: 'When will CNVRTED be available?',
    a: 'We are currently in private early access. We are onboarding teams in cohorts. Join the waitlist and we will reach out directly before access opens.',
  },
  {
    q: 'Who is CNVRTED built for?',
    a: 'Revenue teams at B2B companies — specifically SDR managers, AE leads, RevOps, and GTM operators who are responsible for pipeline quality and outbound efficiency.',
  },
  {
    q: 'How is CNVRTED different from Apollo or ZoomInfo?',
    a: 'Apollo and ZoomInfo answer "who fits my ICP?" — they give you a list. CNVRTED answers "who is in-market right now?" — we give you timing. The two are complementary, not competing.',
  },
  {
    q: 'Does CNVRTED replace my CRM or sales engagement tool?',
    a: 'No. CNVRTED sits on top of your existing stack and pushes enriched signals into it. Your reps keep working in the tools they already use — they just see better accounts.',
  },
  {
    q: 'How do you define the ICP?',
    a: 'During onboarding, we configure your ICP by industry, company size, geography, tech stack, and buyer persona. You can adjust it at any time. Every signal is filtered against your ICP before it reaches your team.',
  },
  {
    q: 'What data sources does CNVRTED monitor?',
    a: 'LinkedIn hiring activity, Reddit communities, X (Twitter) posts, news and press releases, funding databases, job boards, G2 and Capterra reviews, and 50+ additional public sources. All public, no private data.',
  },
]

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="bg-background pt-24">

        {/* Hero */}
        <section className="py-20 md:py-28 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20 text-center">
            <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">
              PRICING
            </p>
            <h1 className="text-display-fluid font-semibold text-text-primary leading-tight mb-6">
              Early access.<br />Pricing coming soon.
            </h1>
            <p className="text-body-lg text-text-secondary leading-relaxed max-w-[520px] mx-auto">
              CNVRTED is in private early access. We are onboarding teams now. Join the waitlist and we will reach out directly before we open up.
            </p>
          </div>
        </section>

        {/* What's included */}
        <section className="py-20 md:py-24 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              <div>
                <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">WHAT IS INCLUDED</p>
                <h2 className="text-h2 font-semibold text-text-primary mb-5 leading-tight">
                  Everything you need.<br />Nothing you do not.
                </h2>
                <p className="text-body text-text-secondary leading-relaxed">
                  Early access includes the full CNVRTED platform — signal detection, intent scoring, enriched context, and CRM integration. No feature gating, no stripped-down tier.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-0">
                {INCLUDED.map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-start gap-3 py-3 ${i < INCLUDED.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(11,107,102,0.12)' }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="#0B6B66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-body text-text-secondary" style={{ fontSize: 14 }}>{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="py-20 md:py-24 border-b border-border bg-surface">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="max-w-[640px] mx-auto text-center">
              <div
                className="inline-block text-caption font-mono uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                style={{ fontSize: 10, color: '#0B6B66', backgroundColor: 'rgba(11,107,102,0.1)' }}
              >
                EARLY ACCESS
              </div>
              <h2 className="text-h2 font-semibold text-text-primary mb-4 leading-tight">
                Get in before we open.
              </h2>
              <p className="text-body text-text-secondary leading-relaxed mb-10">
                We are onboarding teams in cohorts. Waitlist members get first access and direct onboarding — no queue, no self-serve setup.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-body font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: '#0B6B66' }}
              >
                Join the waitlist
              </a>
              <p className="text-caption text-text-tertiary mt-4" style={{ fontSize: 12 }}>
                No spam. We will reach out directly when access opens.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">FAQ</p>
            <h2 className="text-h2 font-semibold text-text-primary mb-12 leading-tight">Common questions.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[960px]">
              {FAQS.map((faq) => (
                <div key={faq.q}>
                  <p className="text-body font-semibold text-text-primary mb-2">{faq.q}</p>
                  <p className="text-body text-text-secondary leading-relaxed" style={{ fontSize: 14 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
