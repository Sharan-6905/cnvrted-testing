'use client'

/**
 * MobileMenu — full-screen overlay for mobile navigation.
 * Spec: docs/05-homepage.md §1 (Mobile nav) + docs/08-ui-principles.md §3.2.
 *
 * Behaviour:
 *   - Renders as a fixed full-viewport overlay (bg-background, z-[48])
 *   - The Nav header (z-50) sits on top, keeping the wordmark, CTA, and X icon
 *     visible at all times per the spec ("Join the waitlist button remains
 *     visible in the collapsed mobile header bar at all times")
 *   - Nav items are vertically centered in the space below the header, at h2 scale
 *   - Close affordances: clicking the X in the nav header, clicking the backdrop,
 *     or pressing Escape (Escape is handled in Nav.tsx via a parent useEffect)
 *   - Focus is trapped inside while open; first focusable element receives focus
 *     on mount; focus returns to the hamburger button via the onClose callback
 *
 * Accessibility:
 *   - role="dialog" aria-modal="true" aria-label per WCAG 2.1 §2.1.2 (no keyboard trap)
 *   - Tab/Shift+Tab cycle within the menu
 *   - Escape handled by parent (Nav.tsx) — consistent with WCAG best practice
 *     of keeping Escape handling closest to the triggering element
 *
 * Animation:
 *   - Uses mobileMenuOverlay variants from lib/motion.ts (200ms opacity fade)
 *   - AnimatePresence in Nav.tsx handles mount/unmount
 */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { mobileMenuOverlay, fadeInUp } from '@/lib/motion'
import { NAV } from '@/content/copy'

interface MobileMenuProps {
  id: string
  onClose: () => void
}

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), ' +
  'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function MobileMenu({ id, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  // Focus trap: keep keyboard focus inside the menu while open
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return

    const focusable = Array.from(
      menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    )
    if (focusable.length === 0) return

    // Move focus into menu on open
    focusable[0]?.focus()

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', trapFocus)
    return () => document.removeEventListener('keydown', trapFocus)
  }, [])

  return (
    <motion.div
      id={id}
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      variants={mobileMenuOverlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      // Close when tapping the backdrop (anywhere outside the nav links)
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-[48] bg-background flex flex-col"
    >
      {/* Spacer: reserves the height of the fixed nav header above the overlay */}
      <div className="h-14 md:h-16 shrink-0" aria-hidden="true" />

      {/* Nav links: vertically centered in remaining viewport height */}
      <nav
        aria-label="Mobile navigation"
        className="flex-1 flex flex-col items-center justify-center gap-3xl px-xl"
      >
        <ul className="flex flex-col items-center gap-2xl list-none" role="list">
          {NAV.links.map((link, i) => (
            <motion.li
              key={link.label}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.06 }}
            >
              <a
                href={link.href}
                onClick={onClose}
                className={[
                  'text-h2 text-text-primary text-center block',
                  'hover:text-accent transition-colors duration-[110ms]',
                  'focus-visible:outline-none focus-visible:text-accent',
                  'focus-visible:underline focus-visible:underline-offset-4',
                  '[text-decoration-color:var(--color-accent)] [text-decoration-thickness:2px]',
                ].join(' ')}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: NAV.links.length * 0.06 + 0.04 }}
          className="flex flex-col items-center gap-3 mt-lg"
        >
          {/* Join our Slack */}
          <a
            href="https://join.slack.com/t/cnvrted/shared_invite/zt-4095523xy-~cLpdY4E3fhQ4_cKvUo8Ug"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-body text-text-secondary border border-border w-full"
          >
            <svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: 16, height: 16, flexShrink: 0 }}>
              <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"/>
              <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"/>
              <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E"/>
              <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.249m14.336 0v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.249a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A"/>
            </svg>
            Join our Slack
          </a>
        </motion.div>
      </nav>
    </motion.div>
  )
}
