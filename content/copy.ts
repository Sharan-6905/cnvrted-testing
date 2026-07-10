/**
 * Single source of truth for all site copy.
 * All strings use straight ASCII quotes only.
 */

// --- Types ---

export type SignalType = "HIRING" | "FUNDING" | "TECH CHANGE" | "PAIN SIGNAL"
export type IntentLevel = "HIGH" | "MEDIUM"

export interface NavLink {
  label: string
  href: string
}

export interface SignalCardCopy {
  tag: SignalType
  signalText: string
  implication: string
  intent: IntentLevel
}

export interface IntentCardCopy {
  tag: SignalType
  timestamp: string
  company: string
  description: string
  source: string
  intent: IntentLevel
  score: number
}

export interface HowItWorksStep {
  number: string
  label: string
  body: string
}

// --- Navigation ---

export const NAV = {
  brand: "CNVRTED",
  links: [] as NavLink[],
  login: { label: "Log in", href: "/login" },
  cta: {
    label: "Join the waitlist",
    href: "#closing-cta",
  },
} as const

// --- Metadata & SEO ---

export const META = {
  title: "CNVRTED - Real-time buying signals for B2B sales teams",
  description:
    "Most accounts in your database fit your ICP. Almost none of them are ready to buy right now. CNVRTED shows you which ones are - and exactly why, today.",
  ogTitle: "CNVRTED - Real-time buying signals for B2B sales teams",
  ogDescription:
    "Stop dialing through contacts that match a profile but show no real sign of intent. CNVRTED surfaces the accounts that are in-market right now, and tells you exactly why.",
  ogImage: "/og-image.png",
  ogImageAlt: "CNVRTED - Surface buying intent. Win more deals.",
} as const

// --- Hero ---

export const HERO = {
  eyebrow: "Real-time buying signals for B2B sales teams",
  headline: "Surface buying intent.\nWin more deals.",
  subheadline:
    "CNVRTED scans the dark funnel across LinkedIn, Reddit, X and the open web to surface accounts showing real buying signals - so you can engage at the right time.",
  cta: "Join the waitlist",
  microcopy: "Be first to access  -  No spam. Ever.",
  noiseLabel: "Noise",
  noiseSubLabel: "Most leads are static",
  signalLabel: "Signal",
  signalSubLabel: "We surface what matters",
  visualDescription:
    "A visual showing how CNVRTED transforms a noisy list of static leads into one clear, high-intent buying signal with context.",
  visualCompanyName: "Acme Corp",
} as const

// --- Trust Bar ---

export const TRUST_BAR = {
  label: "BUILT FOR MODERN REVENUE TEAMS",
  roles: [
    "Sales Development",
    "Account Executives",
    "RevOps",
    "Go-to-Market Leaders",
  ],
} as const

// --- How It Works ---

export const HOW_IT_WORKS = {
  label: "HOW IT WORKS",
  headline: "From noise to pipeline\nin four steps.",
  steps: [
    {
      number: "1",
      label: "We scan the dark funnel",
      body: "Continuously monitor millions of sources across the open web, social, and communities.",
    },
    {
      number: "2",
      label: "Extract buying signals",
      body: "Identify intent signals that indicate a real business need or upcoming decision.",
    },
    {
      number: "3",
      label: "Score & prioritize",
      body: "Our intent scoring ranks accounts by urgency and buying probability.",
    },
    {
      number: "4",
      label: "Engage at the right time",
      body: "Get enriched accounts and real-time context - so your outreach actually lands.",
    },
  ] satisfies HowItWorksStep[],
} as const

// --- Intent Cards ---

export const INTENT_CARDS = {
  label: "REAL EXAMPLES. REAL INTENT.",
  headline: "See what intent looks like.",
  viewAllLabel: "View all signal types",
  cards: [
    {
      tag: "FUNDING" as SignalType,
      timestamp: "2h ago",
      company: "Eloelo",
      description: "Raising $50M+ to scale micro-drama platform. Content pipeline must grow with user base.",
      source: "Moneycontrol",
      intent: "HIGH" as IntentLevel,
      score: 82,
    },
    {
      tag: "HIRING" as SignalType,
      timestamp: "5h ago",
      company: "COL Group",
      description: "Ex-Paramount & Disney execs join microdrama giant — production bar about to rise.",
      source: "Deadline",
      intent: "HIGH" as IntentLevel,
      score: 78,
    },
    {
      tag: "TECH CHANGE" as SignalType,
      timestamp: "1d ago",
      company: "JioHotstar",
      description: "Tadka microdrama hits 100M users — content engine must produce episodes faster than any traditional pipeline.",
      source: "Variety",
      intent: "HIGH" as IntentLevel,
      score: 78,
    },
    {
      tag: "PAIN SIGNAL" as SignalType,
      timestamp: "2d ago",
      company: "Holywater Tech",
      description: "My Drama wins Microdrama App of Year — next move expected to be bigger, faster, more content.",
      source: "TellyCast",
      intent: "MEDIUM" as IntentLevel,
      score: 75,
    },
  ] satisfies IntentCardCopy[],
} as const

// --- Integrations ---

export const INTEGRATIONS = {
  label: "FITS YOUR STACK",
  headline: "Works with the tools you already use.",
  tools: [
    { name: "Salesforce", slug: "salesforce" },
    { name: "HubSpot", slug: "hubspot" },
    { name: "Outreach", slug: "outreach" },
    { name: "Salesloft", slug: "salesloft" },
    { name: "Apollo", slug: "apollo" },
    { name: "Notion", slug: "notion" },
    { name: "Slack", slug: "slack" },
  ],
  moreLabel: "+ More",
} as const

// --- Signal Examples (used by existing SignalCard component) ---

export const SIGNAL_EXAMPLES = {
  label: "WHAT A SIGNAL LOOKS LIKE",
  headline: "Not a contact. A conversation you can actually start.",
  cards: [
    {
      tag: "HIRING" as SignalType,
      signalText: "Posted 4 new Sales Engineering roles in the past 10 days.",
      implication: "Scaling outbound capacity. Likely evaluating tools their new hires will use.",
      intent: "HIGH" as IntentLevel,
    },
    {
      tag: "FUNDING" as SignalType,
      signalText: "Announced a $40M Series B, with go-to-market expansion cited in press release.",
      implication: "New budget cycle, new initiatives. The 60-day window after a funding round is when new vendor decisions are made.",
      intent: "HIGH" as IntentLevel,
    },
    {
      tag: "TECH CHANGE" as SignalType,
      signalText: "Removed HubSpot from listed requirements across 6 open roles in the last 2 weeks.",
      implication: "Possible migration or consolidation in progress. The roles suggest they are not renewing.",
      intent: "MEDIUM" as IntentLevel,
    },
  ],
  inlinePrompt: "This is what your feed looks like.",
  inlineCta: "Join the waitlist",
  inlineCtaHref: "#closing-cta",
  caption: "All examples are illustrative. Real signals are detected continuously and scored against your specific ICP.",
} as const

// --- Why Not a Database ---

export const WHY_NOT_DATABASE = {
  label: "NOT A DATABASE.",
  headline: "We don't sell leads.\nWe surface timing.",
  leftLabel: "Traditional Lead Databases",
  rightLabel: "CNVRTED",
  vsLabel: "vs",
  rows: [
    { left: "Static contact lists",  right: "Real-time buying signals" },
    { left: "Outdated intent",        right: "Live intent from the market" },
    { left: "You chase",              right: "You engage at the right time" },
    { left: "Low reply rates",        right: "Higher reply rates" },
  ],
} as const

// --- Closing CTA ---

export const CLOSING_CTA = {
  label: "BE FIRST.",
  headline: "The window to move first\nis open. It won't be forever.",
  body: "Join the waitlist and be first to surface real-time buying intent before we open up.",
  form: {
    label: "Work email",
    placeholder: "you@company.com",
    cta: "Join the waitlist",
    microcopy: "No spam. You'll hear from us when access opens.",
    honeypotName: "website",
  },
  success: {
    heading: "You're in.",
    body: "We'll reach out directly before we open access. Keep an eye on your work inbox.",
  },
  error: {
    generic: "Something went wrong. Please try again.",
    invalidEmail: "Enter a valid work email.",
  },
} as const

// --- Footer ---

export const FOOTER = {
  descriptor: "Buying signals for the accounts that matter right now.",
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  copyright: "2025 CNVRTED. All rights reserved.",
} as const

// --- Shared UI Labels ---

export const UI = {
  illustrativeLabel: "Illustrative example",
  formSubmitting: "Joining...",
  skipToContent: "Skip to main content",
  menuOpen: "Open menu",
  menuClose: "Close menu",
} as const
