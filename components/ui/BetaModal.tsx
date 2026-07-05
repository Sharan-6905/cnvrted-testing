'use client'

import { useState, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BetaModalProps {
  open: boolean
  onClose: () => void
}

export function BetaModal({ open, onClose }: BetaModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function reset() {
    setName(''); setEmail(''); setPhone('')
    setError(null); setSuccess(false); setLoading(false)
  }

  function handleClose() { reset(); onClose() }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/beta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() || null }),
      })
      if (res.status === 409) {
        setError("You're already signed up!")
        setLoading(false)
        return
      }
      if (!res.ok) {
        setError('Something went wrong. Please try again.')
        setLoading(false)
        return
      }
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Join the CNVRTED beta"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[61] mx-auto max-w-[480px] rounded-2xl border border-border bg-background shadow-2xl p-8"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {!success ? (
              <>
                <div className="mb-6">
                  <p className="text-caption font-mono uppercase tracking-widest mb-2" style={{ fontSize: 10, color: '#0B6B66' }}>EARLY BETA</p>
                  <h2 className="text-h3 font-semibold text-text-primary mb-1">Join our beta</h2>
                  <p className="text-body text-text-secondary" style={{ fontSize: 14 }}>
                    Get early access to CNVRTED. We'll reach out directly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={nameId} className="text-caption font-medium text-text-secondary" style={{ fontSize: 12 }}>Full name <span className="text-red-400">*</span></label>
                    <input
                      id={nameId}
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      disabled={loading}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 disabled:opacity-50 transition-colors duration-150"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={emailId} className="text-caption font-medium text-text-secondary" style={{ fontSize: 12 }}>Work email <span className="text-red-400">*</span></label>
                    <input
                      id={emailId}
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      autoComplete="email"
                      disabled={loading}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 disabled:opacity-50 transition-colors duration-150"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={phoneId} className="text-caption font-medium text-text-secondary" style={{ fontSize: 12 }}>Phone number <span className="text-text-tertiary font-normal">(optional)</span></label>
                    <input
                      id={phoneId}
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      disabled={loading}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 disabled:opacity-50 transition-colors duration-150"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-caption text-red-500" style={{ fontSize: 12 }}>{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-1 py-3 px-6 rounded-full font-semibold text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: '#0B6B66' }}
                  >
                    {loading ? 'Submitting…' : 'Request beta access'}
                  </button>

                  <p className="text-center text-text-tertiary" style={{ fontSize: 11 }}>No spam. We'll reach out when access opens.</p>
                </form>
              </>
            ) : (
              <div className="py-6 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(11,107,102,0.12)' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5L18 6" stroke="#0B6B66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-h3 font-semibold text-text-primary mb-2">You're in.</h2>
                  <p className="text-body text-text-secondary leading-relaxed" style={{ fontSize: 14 }}>
                    We've added you to the beta list. We'll reach out directly before access opens.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-2 px-6 py-2.5 rounded-full font-medium text-white"
                  style={{ backgroundColor: '#0B6B66' }}
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
