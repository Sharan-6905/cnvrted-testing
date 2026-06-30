import Link from 'next/link'
import { NAV, FOOTER } from '@/content/copy'

export function Footer() {
  return (
    <footer
      className="overflow-hidden bg-background"
      role="contentinfo"
    >
      {/* Top bar */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20 py-6 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Copyright */}
          <p className="text-caption text-text-tertiary">
            &copy; 2025 {NAV.brand}.
          </p>

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-body text-text-secondary hover:text-text-primary transition-colors duration-[110ms]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#closing-cta"
              className="text-body text-text-secondary hover:text-text-primary transition-colors duration-[110ms]"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>

      {/* Giant half-visible outlined wordmark */}
      <div
        className="relative w-full overflow-hidden select-none pointer-events-none"
        aria-hidden="true"
        style={{ height: 'clamp(60px, 15vw, 180px)' }}
      >
        <p
          className="absolute left-1/2 whitespace-nowrap font-sans font-bold leading-none"
          style={{
            fontSize: 'clamp(120px, 22vw, 320px)',
            letterSpacing: '-0.03em',
            top: '10%',
            transform: 'translateX(-50%)',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(0,0,0,0.25)',
          }}
        >
          {NAV.brand}
        </p>
      </div>
    </footer>
  )
}
