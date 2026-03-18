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
import { WishlistPage } from "../features/wishlist/WishlistPage";

function HomePage() {
  return (
    <>
      <PageSEO title={site.seoTitle} description={site.seoDescription} path="/" />
      <LandingHeader />
      <main>
        <LandingHero />
        <StatsRow />
        <AudienceSection />
        <ProgramSection />
        <CourseStructureSection />
        <InstructorSection />
        <BonusesSection />
        <PricingSection />
        <LandingFaq />
        <FinalEnquirySection />
      </main>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
  );
}
