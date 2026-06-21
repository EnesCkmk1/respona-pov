import { SiteHeader } from "../components/landing/SiteHeader";
import { FaqSection } from "../components/landing/FaqSection";
import {
  ContactSection,
  DashboardSection,
  DemoSection,
  FeaturesSection,
  HeroSection,
  SiteFooter,
  StatsSection
} from "../components/landing/Sections";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-site-bg text-site-text antialiased">
      <SiteHeader />
      <main>
        <HeroSection />
        <DemoSection />
        <StatsSection />
        <FeaturesSection />
        <DashboardSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
