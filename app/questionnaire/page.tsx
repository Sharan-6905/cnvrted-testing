import { Footer } from '@/components/layout/Footer'
import { QuestionnaireForm } from '@/components/questionnaire/QuestionnaireForm'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Questionnaire - CNVRTED',
  description: 'Tell us about yourself and your team so we can build CNVRTED for you.',
}

export default function QuestionnairePage() {
  return (
    <>
      <main className="bg-background pt-20 md:pt-24 min-h-screen">
        <section className="py-10 md:py-20 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="max-w-[640px] mx-auto text-center">
              <SectionLabel className="mb-3 md:mb-4">A few questions</SectionLabel>
              <h1 className="text-display-fluid font-semibold text-text-primary leading-tight mb-4 md:mb-6">
                Help us build this for you.
              </h1>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                Two minutes. No sales pitch — just understanding who you are and what you need.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-24">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_minmax(0,640px)] lg:justify-between gap-10 lg:gap-16">

              {/* Left rail — sticky context, fills the space a bare centered form would waste on wide screens */}
              <div className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
                <SectionLabel className="mb-4">Why we ask</SectionLabel>
                <h2 className="text-h2 font-semibold text-text-primary mb-4 leading-tight">
                  Five short steps. Nothing wasted.
                </h2>
                <p className="text-body text-text-secondary leading-relaxed mb-8">
                  We're building CNVRTED for revenue teams like yours — every answer here
                  shapes what we build next and how we prioritize your onboarding.
                </p>
                <ul className="flex flex-col gap-4">
                  {[
                    'No spam, no sales sequences — a real person reads every response.',
                    'Takes about two minutes, most fields are optional.',
                    "We'll reach out directly to schedule your demo.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-1 w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'var(--color-accent-dim)' }}
                        aria-hidden="true"
                      >
                        <svg width="10" height="10" viewBox="0 0 22 22" fill="none">
                          <path d="M4 11l5 5L18 6" stroke="#0B6B66" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-body text-text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <QuestionnaireForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
