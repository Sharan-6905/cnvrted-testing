import type { Metadata } from 'next'
import { sans, mono } from '@/styles/fonts'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { Nav } from '@/components/layout/Nav'
import { META, UI } from '@/content/copy'
import './globals.css'

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: META.ogTitle,
    description: META.ogDescription,
    images: [
      {
        url: 'https://www.cnvrted.com/og-image.png',
        width: 1200,
        height: 630,
        alt: META.ogImageAlt,
      },
    ],
    type: 'website',
    url: 'https://www.cnvrted.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: META.ogTitle,
    description: META.ogDescription,
    images: ['https://www.cnvrted.com/og-image.png'],
  },
  metadataBase: new URL('https://www.cnvrted.com'),
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen antialiased">
        {/* Skip-to-content — first focusable element in the tab order.
            Visible only on keyboard focus (CSS: .skip-link in globals.css).
            Allows keyboard users to bypass the nav and jump to main content. */}
        <a href="#main-content" className="skip-link">
          {UI.skipToContent}
        </a>

        <MotionProvider>
          {/* Nav is fixed-positioned (z-50) — does not affect document flow.
              Pages with a hero section render behind the transparent nav.
              Pages without a hero should add pt-14 md:pt-16 to their first element. */}
          <Nav />
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
