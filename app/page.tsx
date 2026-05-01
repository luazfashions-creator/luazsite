"use client";

import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import RitualExperienceSection from "@/components/RitualExperienceSection";
import RitualWindowsSection from "@/components/RitualWindowsSection";
import ScrollStorySections from "@/components/ScrollStorySections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="theme-page min-h-screen bg-[#050505] font-sans text-white selection:bg-white/20">
      <Navbar />
      <HeroVideo />
      <RitualExperienceSection />
      <RitualWindowsSection />
      <ScrollStorySections />
      <Footer />
    </div>
  );
}
