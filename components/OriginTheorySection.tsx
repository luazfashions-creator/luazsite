"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function OriginTheorySection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax for the mountain background
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[100svh] py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic Himalaya Background - Unblurred & Full Color */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none"
      >
        <Image
          src="/images/aa.jpeg"
          alt="Himalaya Mountain Background"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Very subtle dark gradient just to ensure the white text is readable, but image remains clear and vibrant */}
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Content Container - One Paragraph */}
      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-20 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-black/20 p-8 md:p-14 lg:p-20 rounded-3xl border border-white/10"
        >
          <p className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-md text-balance mb-8">
            Geboren in der absoluten Stille des Himalayas. LUAZ verbindet jahrhundertealte Rituale mit modernster Schlafforschung. Ein Ort, an dem Ruhe kein Luxus ist, sondern ein elementarer Teil des Lebens.
            <br/><br/>
            Guter Schlaf beginnt nicht erst im Bett. Er beginnt mit dem Übergang. Im Yoga ist innere Ruhe kein plötzlicher Zustand, sondern eine bewusste, geführte Bewegung von außen nach innen. LUAZ übersetzt dieses Geheimnis in ein müheloses, tägliches Abendritual für deinen Alltag.
          </p>

          <div className="flex flex-col md:flex-row gap-8 md:gap-6 text-left w-full justify-center mt-12 mb-12">
            <div className="flex-1 border-l border-luaz-gold-soft/50 pl-4">
              <h4 className="text-luaz-gold-soft text-xs uppercase tracking-widest font-medium mb-2">1. Körper</h4>
              <p className="text-white/80 text-sm leading-relaxed font-light">Tiefe Wärme und sanfte Berührung helfen dem Körper, den Stress des Tages sofort physisch loszulassen.</p>
            </div>
            <div className="flex-1 border-l border-luaz-gold-soft/50 pl-4">
              <h4 className="text-luaz-gold-soft text-xs uppercase tracking-widest font-medium mb-2">2. Atem</h4>
              <p className="text-white/80 text-sm leading-relaxed font-light">Eine verlangsamte Atmung signalisiert deinem Nervensystem eindeutig: Der Tag ist nun sicher beendet.</p>
            </div>
            <div className="flex-1 border-l border-luaz-gold-soft/50 pl-4">
              <h4 className="text-luaz-gold-soft text-xs uppercase tracking-widest font-medium mb-2">3. Geist</h4>
              <p className="text-white/80 text-sm leading-relaxed font-light">Die tägliche Wiederholung schafft eine magische, spürbare Grenze zwischen der Aktivität und dem tiefen Schlaf.</p>
            </div>
          </div>

          <p className="font-serif italic text-2xl md:text-3xl text-white leading-relaxed drop-shadow-md">
            &quot;Yoga lehrt uns nicht nur, wie wir uns bewegen. Es lehrt uns vor allem, wie wir zur Ruhe kommen.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
