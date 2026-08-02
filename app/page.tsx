import { CartierHero } from "@/components/CartierHero";
import RitualExperienceSection from "@/components/RitualExperienceSection";
import { OriginTheorySection } from "@/components/OriginTheorySection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ScratchCardSection } from "@/components/ScratchCardSection";
import { AppCompanion } from "@/components/AppCompanion";
import { FounderStory } from "@/components/FounderStory";
import { ContactSection } from "@/components/ContactSection";
import { PremiumFooter } from "@/components/PremiumFooter";
import { AcquireKitSection } from "@/components/AcquireKitSection";

export default function Home() {
  return (
    <div className="theme-page relative min-h-screen bg-luaz-bg font-sans text-luaz-text selection:bg-luaz-stone/30">
      <CartierHero />
      <RitualExperienceSection />
      <AcquireKitSection />
      <OriginTheorySection />
      <TestimonialSection />
      <ScratchCardSection />
      <AppCompanion />
      <FounderStory />
      <ContactSection />
      <PremiumFooter />
    </div>
  );
}
