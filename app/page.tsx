import { CartierHero } from "@/components/CartierHero";
import RitualExperienceSection from "@/components/RitualExperienceSection";
import { RitualSequence } from "@/components/RitualSequence";
import { AppCompanion } from "@/components/AppCompanion";
import { FounderStory } from "@/components/FounderStory";
import { ContactSection } from "@/components/ContactSection";
import { PremiumFooter } from "@/components/PremiumFooter";

export default function Home() {
  return (
    <div className="theme-page relative min-h-screen bg-luaz-bg font-sans text-luaz-text selection:bg-luaz-stone/30">
      <CartierHero />
      <RitualExperienceSection />
      <RitualSequence />
      <AppCompanion />
      <FounderStory />
      <ContactSection />
      <PremiumFooter />
    </div>
  );
}
