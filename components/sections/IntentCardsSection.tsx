'use client'

import { motion } from 'framer-motion'
import { INTENT_CARDS } from '@/content/copy'
import type { IntentCardCopy } from '@/content/copy'
import { Tag } from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/tokens'

function IntentCard({ card, index }: { card: IntentCardCopy; index: number }) {
  const intentStyles = card.intent === 'HIGH'
    ? 'bg-[#0B6B66] text-white'
    : 'bg-[#FEF3E2] text-[#92540A]'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: DURATION.base, delay: index * 0.08, ease: EASE.default }}
      whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)' }}
      className="rounded-lg border border-border bg-surface-raised shadow-card p-5 flex flex-col gap-3 cursor-default"
    >
      {/* Top row: tag + timestamp */}
      <div className="flex items-center justify-between gap-2">
        <Tag type={card.tag} />
        <span className="text-caption text-text-tertiary">{card.timestamp}</span>
      </div>

      {/* Company name — blurred for privacy */}
      <h3 className="text-h3 font-semibold text-text-primary select-none" style={{ filter: 'blur(6px)' }}>{card.company}</h3>

      {/* Description */}
      <p className="text-body text-text-secondary flex-1">{card.description}</p>

      {/* Source badge */}
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 text-caption text-text-tertiary">
          <span className="w-4 h-4 rounded bg-surface flex items-center justify-center text-[9px] font-bold border border-border">
            {card.source[0]}
          </span>
          {card.source}
        </span>
      </div>

      {/* Bottom: intent badge + score */}
      <div className="flex items-center justify-between pt-1 border-t border-border mt-1">
        <span
          className={[
            'inline-flex items-center rounded-md text-mono-tag font-mono py-xs px-[0.625rem] leading-none',
            intentStyles,
          ].join(' ')}
        >
          {card.intent === 'HIGH' ? 'HIGH INTENT' : 'MEDIUM INTENT'}
        </span>
        <span className="text-h3 font-semibold text-text-primary tabular-nums">{card.score}</span>
      </div>
    </motion.article>
  )
}

export function IntentCardsSection() {
  return (
    <section
      id="signal-examples"
      aria-label="Intent signal examples"
      className="bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-3">
              {INTENT_CARDS.label}
            </p>
            <h2 className="text-h1-fluid text-text-primary">{INTENT_CARDS.headline}</h2>
          </div>
          <a
            href="#closing-cta"
            className="shrink-0 text-body text-text-secondary border border-border rounded-md px-4 py-2 hover:border-text-tertiary hover:text-text-primary transition-colors self-start sm:self-auto"
          >
            {INTENT_CARDS.viewAllLabel}
          </a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INTENT_CARDS.cards.map((card, i) => (
            <IntentCard key={card.company} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
