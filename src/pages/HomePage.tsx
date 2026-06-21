import { SiteHeader } from "../components/landing/SiteHeader";
import {
  CtaSection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  SiteFooter
} from "../components/landing/Sections";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-kumo-elevated text-kumo-default">
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
