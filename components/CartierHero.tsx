"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useVideoInView } from "@/lib/hooks/useVideoInView";

export function CartierHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoInView(videoRef);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/media/hero/luaz-hero-mobile.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      
      {/* Subtle overlay for text readability without washing out video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/40" />
      
      {/* Fixed Header */}
      <header className="absolute top-0 left-0 z-50 w-full px-6 py-6 sm:px-10">
        <div className="relative flex items-center justify-center">
          <nav className="absolute left-0 hidden gap-8 text-[11px] font-medium uppercase tracking-[0.25em] text-white/80 md:flex">
            <a href="#ritual" className="transition-colors hover:text-white">ritual</a>
            <a href="#ritual-sequence" className="transition-colors hover:text-white">sequence</a>
          </nav>

          <div className="font-cursive text-[3.5rem] tracking-normal text-white drop-shadow-md md:text-7xl lg:text-[5.5rem] mt-2">
            Luaz
          </div>

          <nav className="absolute right-0 hidden gap-8 text-[11px] font-medium uppercase tracking-[0.25em] text-white/80 md:flex">
            <a href="#app-companion" className="transition-colors hover:text-white">app</a>
            <a href="#founder-story" className="transition-colors hover:text-white">founder</a>
            <a href="#contact" className="transition-colors hover:text-white">contact</a>
          </nav>
        </div>
      </header>

      {/* Center Intro Text */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-[15vh] text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 drop-shadow-md"
        >
          Das Einschlafritual
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl font-light leading-[1.1] text-white drop-shadow-lg sm:text-5xl md:text-7xl lg:text-[6rem]"
        >
          Dein Körper weiß, wie er schläft.<br />Er hat es nur verlernt.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm md:text-base font-light text-white/90 max-w-lg mx-auto leading-relaxed drop-shadow-md"
        >
          Fünf sensorische Schritte. Jeden Abend.<br />Bis dein Körper von selbst loslässt.
        </motion.p>
      </div>
    </section>
  );
}
