import { INTEGRATIONS } from '@/content/copy'

// Salesforce logo: cloud icon + branded wordmark side by side
function SalesforceLogo() {
  return (
    <div className="flex items-center gap-1.5">
      {/* Cloud shape in Salesforce blue */}
      <svg
        viewBox="0 0 24 17"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ height: 28, width: 'auto', display: 'block' }}
      >
        <path
          fill="#00A1E0"
          d="M10 1.8a5.1 5.1 0 0 1 3.1-.9c1.6 0 3 .9 3.7 2.1a5.3 5.3 0 0 1 2.1-.4c2.9 0 5.3 2.4 5.3 5.3s-2.4 5.3-5.3 5.3c-.3 0-.7 0-1-.1a3.3 3.3 0 0 1-3.3 1.9 3.3 3.3 0 0 1-1.6-.4 3.8 3.8 0 0 1-3.8 2.4 3.9 3.9 0 0 1-3.9-2.6H5a5.3 5.3 0 0 1 0-10.6c.6 0 1.1.1 1.6.3A4.6 4.6 0 0 1 10 1.8z"
        />
      </svg>
      {/* Wordmark */}
      <span
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: 15,
          fontWeight: 400,
          color: '#00A1E0',
          letterSpacing: '-0.2px',
          lineHeight: 1,
        }}
      >
        sales<em style={{ fontStyle: 'italic', fontWeight: 700 }}>f</em>orce
      </span>
    </div>
  )
}

// Slack logo: official 4-color icon + wordmark
function SlackLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ height: 26, width: 26, display: 'block' }}
      >
        {/* Blue */}
        <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0" />
        {/* Green */}
        <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D" />
        {/* Yellow */}
        <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E" />
        {/* Red */}
        <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.249m14.336 0v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.249a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A" />
      </svg>
      <span
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: 15,
          fontWeight: 700,
          color: '#1D1C1D',
          letterSpacing: '-0.2px',
          lineHeight: 1,
        }}
      >
        Slack
      </span>
    </div>
  )
}

// Salesloft logo: dark green serif wordmark + lime dot
function SalesloftLogo() {
  return (
    <div className="flex items-center">
      <span
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 16,
          fontWeight: 700,
          color: '#1B4332',
          letterSpacing: '-0.3px',
          lineHeight: 1,
        }}
      >
        Salesloft
      </span>
      <span style={{ fontSize: 20, fontWeight: 900, color: '#B5CC18', lineHeight: 1, marginBottom: -2 }}>.</span>
    </div>
  )
}

// Apollo.io logo: A-frame icon with yellow triangle + wordmark
function ApolloLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ height: 26, width: 26, display: 'block' }}
      >
        {/* Outer A shape in black */}
        <polygon points="16,2 30,28 22,28 16,16 10,28 2,28" fill="#000000" />
        {/* Inner cutout to create the tent/A frame hollow */}
        <polygon points="16,10 21,20 11,20" fill="white" />
        {/* Yellow downward triangle at the peak */}
        <polygon points="13.5,10 18.5,10 16,14" fill="#F5C518" />
      </svg>
      <span
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: 15,
          fontWeight: 700,
          color: '#000000',
          letterSpacing: '-0.3px',
          lineHeight: 1,
        }}
      >
        Apollo.io
      </span>
    </div>
  )
}

// Outreach logo: rounded-triangle icon + wordmark
function OutreachLogo() {
  const purple = '#5951F5'
  return (
    <div className="flex items-center gap-2">
      {/* Icon: rounded shield/triangle with circular cutout */}
      <svg
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ height: 28, width: 28, display: 'block' }}
      >
        <path
          fill={purple}
          d="M20 4C12.5 4 7 10 7 17c0 4.5 2.2 8.5 5.6 11l5.4 4a3 3 0 0 0 4 0l5.4-4C30.8 25.5 33 21.5 33 17 33 10 27.5 4 20 4z"
        />
        <circle cx="20" cy="17" r="5.5" fill="white" />
      </svg>
      {/* Wordmark */}
      <span
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: 15,
          fontWeight: 700,
          color: purple,
          letterSpacing: '-0.2px',
          lineHeight: 1,
        }}
      >
        Outreach
      </span>
    </div>
  )
}

export function IntegrationsSection() {
  return (
    <section
      aria-label="Integrations"
      className="bg-surface border-y border-border py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em]">
            {INTEGRATIONS.label}
          </p>
          <h2 className="text-h2 text-text-primary font-semibold">{INTEGRATIONS.headline}</h2>

          {/* Logo row */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {INTEGRATIONS.tools.map((tool) => (
              <div
                key={tool.slug}
                className="flex items-center gap-2.5 opacity-100 transition-opacity"
                title={tool.name}
              >
                {tool.slug === 'salesforce' ? (
                  <SalesforceLogo />
                ) : tool.slug === 'outreach' ? (
                  <OutreachLogo />
                ) : tool.slug === 'salesloft' ? (
                  <SalesloftLogo />
                ) : tool.slug === 'apollo' ? (
                  <ApolloLogo />
                ) : tool.slug === 'slack' ? (
                  <SlackLogo />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://cdn.simpleicons.org/${tool.slug}`}
                      alt=""
                      width={24}
                      height={24}
                      style={{ width: 24, height: 24, objectFit: 'contain', display: 'block' }}
                    />
                    <span className="text-body font-medium text-text-secondary">{tool.name}</span>
                  </>
                )}
              </div>
            ))}
            <span className="text-body text-text-tertiary font-medium">{INTEGRATIONS.moreLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
