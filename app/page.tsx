import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { IntentCardsSection } from '@/components/sections/IntentCardsSection'
import { FlowchartSection } from '@/components/sections/FlowchartSection'
import { IntegrationsSection } from '@/components/sections/IntegrationsSection'
import { ComparisonSection } from '@/components/sections/ComparisonSection'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <TrustBar />
        <HowItWorksSection />
        <IntentCardsSection />
        <FlowchartSection />
        <IntegrationsSection />
        <ComparisonSection />
      </main>
      <Footer />
    </>
  )
}
