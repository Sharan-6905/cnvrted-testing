'use client'

/**
 * Nav — fixed site-wide navigation bar.
 * Spec: docs/05-homepage.md §1 + docs/04-design-system.md §8.4 + docs/06-motion.md §5.4.
 *
 * Scroll behaviour (from docs/06-motion.md §5.4):
 *   "Watch the hero headline element with an Intersection Observer (threshold: 0);
 *    when it leaves the viewport (top edge), add the scrolled state to the nav.
 *    Do not use a pixel-offset scroll listener."
 *   The observed element is identified by id="hero-headline" — set on the hero
 *   headline in HeroSection (Phase 5). The useNavScrolled hook handles the case
 *   where the element doesn't exist on non-homepage routes (stays transparent).
 *
 * Transition (docs/06-motion.md §5.4):
 *   motion-fast (200ms), ease-in-out.
 *   transparent background + transparent border → color-background + color-border.
 *   No backdrop blur (docs/04-design-system.md §8.4: "clean white, not frosted").
 *
 * Mobile:
 *   Hamburger icon transforms to X on open (CSS transition, not Framer Motion).
 *   Full-screen overlay (MobileMenu) sits at z-[48]; this header stays at z-50.
 *   CTA button persists in the header at all times (visible even when menu open).
 *   Escape key closes the menu (useEffect in this component).
 *   Body scroll is locked while menu is open (overflow: hidden on body).
 *
 * Accessibility:
 *   - role="banner" on <header>
 *   - aria-label="Primary navigation" on desktop <nav>
 *   - aria-expanded, aria-controls, aria-haspopup on hamburger
 *   - Focus returns to hamburger when mobile menu closes
 *   - Nav links use the focus style from docs/04-design-system.md §8.6:
 *     "underline in color-accent, 2px thickness, 2px offset"
 */

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { BetaModal } from '@/components/ui/BetaModal'
import { useNavScrolled } from '@/lib/hooks/useNavScrolled'
import { NAV, UI } from '@/content/copy'

export function Nav() {
  const scrolled = useNavScrolled('hero-headline')
  const [menuOpen, setMenuOpen] = useState(false)
  const [betaOpen, setBetaOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 60) { setVisible(true); lastScrollY.current = y; return }
      setVisible(y < lastScrollY.current)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const openMenu = () => setMenuOpen(true)

  const closeMenu = () => {
    setMenuOpen(false)
    // Return focus to trigger element (WCAG 2.1 §2.4.3 Focus Order)
    hamburgerRef.current?.focus()
  }

  // Escape closes the mobile menu — handled here (closest to the trigger)
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen])

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        role="banner"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(-120%)', transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)' }}
        className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div
          className={[
            'pointer-events-auto flex items-center justify-between gap-xl',
            'h-12 px-5 rounded-full',
            'transition-[background-color,border-color,box-shadow] duration-[200ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
            'border',
            scrolled
              ? 'bg-background border-border shadow-sm'
              : 'bg-background/80 border-border/60 backdrop-blur-sm',
          ].join(' ')}
          style={{ minWidth: 0, maxWidth: 1000, width: '100%', margin: '0 auto' }}
        >

          {/* ── Wordmark ─────────────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="CNVRTED — return to homepage"
            className={[
              'text-h3 text-text-primary shrink-0 leading-none',
              // Focus: ring-style override (accent ring vs the global accent outline)
              'focus-visible:outline-none rounded-sm',
              'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            ].join(' ')}
          >
            {NAV.brand}
          </Link>

          {/* ── Desktop nav links ─────────────────────────────────────────── */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-2xl"
          >
            {NAV.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={[
                  'text-body text-text-secondary hover:text-text-primary',
                  'transition-colors duration-[110ms]',
                  // Focus: underline in accent, 2px, 2px offset per §8.6
                  'focus-visible:outline-none focus-visible:text-text-primary',
                  'focus-visible:underline focus-visible:underline-offset-[3px]',
                  '[text-decoration-color:var(--color-accent)]',
                  '[text-decoration-thickness:2px]',
                ].join(' ')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Right side: Join our Slack + hamburger ───────────────────── */}
          <div className="flex items-center gap-lg">

            {/* Join beta — desktop only */}
            <button
              onClick={() => setBetaOpen(true)}
              className="hidden md:flex items-center gap-2 text-body font-medium text-white rounded-full px-4 py-1.5 transition-opacity duration-[110ms] hover:opacity-90"
              style={{ backgroundColor: '#0B6B66' }}
            >
              Join our beta
            </button>

            {/* Join our Slack — desktop only */}
            <a
              href="https://join.slack.com/t/cnvrted/shared_invite/zt-4095523xy-~cLpdY4E3fhQ4_cKvUo8Ug"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-body text-text-secondary hover:text-text-primary transition-colors duration-[110ms] border border-border rounded-full px-4 py-1.5 hover:border-text-secondary"
            >
              {/* Slack icon (inline, 4-color) */}
              <svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: 16, height: 16, display: 'block', flexShrink: 0 }}>
                <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"/>
                <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"/>
                <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E"/>
                <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.249m14.336 0v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.249a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A"/>
              </svg>
              Join our Slack
            </a>

            {/* Hamburger / X — mobile only (hidden md+) */}
            <button
              ref={hamburgerRef}
              type="button"
              aria-label={menuOpen ? UI.menuClose : UI.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
              onClick={() => (menuOpen ? closeMenu() : openMenu())}
              className={[
                'md:hidden',
                'flex flex-col items-center justify-center gap-[5px]',
                'w-10 h-10 rounded-md shrink-0',
                'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
              ].join(' ')}
            >
              {/* Top bar — rotates to form the \ of X when open */}
              <span
                className={[
                  'block w-5 h-[1.5px] rounded-full bg-text-primary',
                  'transition-transform duration-[200ms] origin-center',
                  menuOpen ? 'translate-y-[6.5px] rotate-45' : '',
                ].join(' ')}
                aria-hidden="true"
              />
              {/* Middle bar — fades out when open */}
              <span
                className={[
                  'block w-5 h-[1.5px] rounded-full bg-text-primary',
                  'transition-opacity duration-[200ms]',
                  menuOpen ? 'opacity-0' : 'opacity-100',
                ].join(' ')}
                aria-hidden="true"
              />
              {/* Bottom bar — rotates to form the / of X when open */}
              <span
                className={[
                  'block w-5 h-[1.5px] rounded-full bg-text-primary',
                  'transition-transform duration-[200ms] origin-center',
                  menuOpen ? '-translate-y-[6.5px] -rotate-45' : '',
                ].join(' ')}
                aria-hidden="true"
              />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile menu overlay — AnimatePresence manages enter/exit animation */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            id="mobile-menu"
            onClose={closeMenu}
          />
        )}
      </AnimatePresence>

      <BetaModal open={betaOpen} onClose={() => setBetaOpen(false)} />
    </>
  )
}
