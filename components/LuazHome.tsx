"use client";

import { useEffect, useState } from "react";
import { LuazProduct } from "@/data/products";
import { FinalCTA } from "./FinalCTA";
import { LuxuryCursor } from "./LuxuryCursor";
import { Navbar } from "./Navbar";
import { PremiumRitualScroll } from "./PremiumRitualScroll";
import { ProductStoryModal } from "./ProductStoryModal";
import { ProductWindowsSection } from "./ProductWindowsSection";
import { RitualSystemSection } from "./RitualSystemSection";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export function LuazHome() {
  const [activeProduct, setActiveProduct] = useState<LuazProduct | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeProduct ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProduct]);

  return (
    <SmoothScrollProvider>
      <Navbar />
      <LuxuryCursor />
      <main className="bg-luaz-void">
        <PremiumRitualScroll />
        <ProductWindowsSection onOpenProduct={setActiveProduct} />
        <RitualSystemSection />
        <FinalCTA />
      </main>
      <ProductStoryModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </SmoothScrollProvider>
  );
}
