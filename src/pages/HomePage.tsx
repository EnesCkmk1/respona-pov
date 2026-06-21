import { SiteHeader } from "../components/landing/SiteHeader";
import { FaqSection } from "../components/landing/FaqSection";
import {
  CapabilitiesSection,
  ContactSection,
  DemoSection,
  HeroSection,
  SiteFooter
} from "../components/landing/Sections";
import { CtaBand } from "../components/landing/CtaBand";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { Reveal } from "../components/landing/Reveal";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { SeoJsonLd } from "../components/SeoJsonLd";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-site-bg text-site-text antialiased">
      <SeoJsonLd />
      <SiteHeader />
      <main>
        <HeroSection />
        <Reveal>
          <TestimonialsSection />
        </Reveal>
        <Reveal delay={80}>
          <HowItWorksSection />
        </Reveal>
        <Reveal delay={80}>
          <DemoSection />
        </Reveal>
        <Reveal delay={80}>
          <CapabilitiesSection />
        </Reveal>
        <Reveal delay={80}>
          <FaqSection />
        </Reveal>
        <Reveal>
          <CtaBand />
        </Reveal>
        <Reveal delay={60}>
          <ContactSection />
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
