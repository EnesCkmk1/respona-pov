import { SiteHeader } from "../components/landing/SiteHeader";
import {
  ContactSection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  MarqueeSection,
  SiteFooter
} from "../components/landing/Sections";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-kumo-elevated text-kumo-default">
      <SiteHeader />
      <main>
        <HeroSection />
        <MarqueeSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
