import { Routes, Route } from "react-router-dom";
import { PageSEO } from "../components/seo/PageSEO";
import site from "../data/site.json";
import { LandingHeader } from "../features/landing/LandingHeader";
import { LandingHero } from "../features/landing/LandingHero";
import { StatsRow } from "../features/landing/StatsRow";
import { AudienceSection } from "../features/landing/AudienceSection";
import { ProgramSection } from "../features/landing/ProgramSection";
import { CourseStructureSection } from "../features/landing/CourseStructureSection";
import { InstructorSection } from "../features/landing/InstructorSection";
import { BonusesSection } from "../features/landing/BonusesSection";
import { PricingSection } from "../features/landing/PricingSection";
import { LandingFaq } from "../features/landing/LandingFaq";
import { FinalEnquirySection } from "../features/landing/FinalEnquirySection";
import { ScrollReveal } from "../components/ScrollReveal";
import { RefundPolicyPage } from "../features/legal/RefundPolicyPage";
import { WaitlistPage } from "../features/waitlist/WaitlistPage";

const SHOW_WAITLIST = false;
const SHOW_PRICING = false;

function HomePage() {
  return (
    <>
      <PageSEO title={site.seoTitle} description={site.seoDescription} path="/" />
      <LandingHeader />
      <main>
        <ScrollReveal>
          <LandingHero />
        </ScrollReveal>
        <ScrollReveal>
          <StatsRow />
        </ScrollReveal>
        <ScrollReveal>
          <AudienceSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProgramSection />
        </ScrollReveal>
        <ScrollReveal>
          <CourseStructureSection />
        </ScrollReveal>
        <ScrollReveal>
          <InstructorSection />
        </ScrollReveal>
        <ScrollReveal>
          <BonusesSection />
        </ScrollReveal>
        {SHOW_PRICING ? (
          <ScrollReveal>
            <PricingSection />
          </ScrollReveal>
        ) : null}
        <ScrollReveal>
          <LandingFaq />
        </ScrollReveal>
        <ScrollReveal>
          <FinalEnquirySection />
        </ScrollReveal>
      </main>
    </>
  );
}

export default function App() {
  if (SHOW_WAITLIST) return <WaitlistPage />;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
      <Route path="/refund" element={<RefundPolicyPage />} />
    </Routes>
  );
}
