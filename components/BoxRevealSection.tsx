"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BoxRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Cinematic Apple-style Box Reveal 
  const boxScale = useTransform(scrollYProgress, [0, 0.4], [0.6, 1.2]);
  const boxOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [1, 1, 1, 1]);
  const boxY = useTransform(scrollYProgress, [0, 0.4], [150, 0]);
  const boxRotateX = useTransform(scrollYProgress, [0, 0.4], [30, 10]);
  
  // Text appearance
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.6], [1, 1, 1, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  // Lid opening sequence
  const lidRotateX = useTransform(scrollYProgress, [0.4, 0.65], [0, -120]);
  const lidY = useTransform(scrollYProgress, [0.4, 0.65], [0, -40]);
  const lidZ = useTransform(scrollYProgress, [0.4, 0.65], [0, -20]);

  // Inner Glow when box opens
  const glowOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const glowScale = useTransform(scrollYProgress, [0.45, 0.7], [0.8, 1.4]);

  // Background subtle motion
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.08]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0f0d0c] border-t border-[#0f0d0c]" id="ritual">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1200px] bg-[#0f0d0c]">
        
        {/* Soft emotional background */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src="/images/model.png"
            alt=""
            aria-hidden="true"
            style={{ scale: bgScale }}
            className="h-full w-full object-cover object-center opacity-[0.28] blur-[3px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0d0c]/80 via-[#241812]/55 to-[#0f0d0c]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,13,12,0.35)_55%,rgba(15,13,12,0.85)_100%)]" />
        </div>

        <motion.div 
          style={{ opacity: textOpacity, y: textY, willChange: "transform, opacity" }}
          className="absolute top-[20%] z-30 text-center w-full px-4"
        >
          <p className="text-white/50 uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 font-medium">
            Nach dem ersten Atemzug
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#f5f3ef] mb-6">
            Beginnt das Ritual.
          </h2>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-8" />
        </motion.div>

        {/* Box Rig */}
        <motion.div 
          style={{ 
            scale: boxScale, 
            opacity: boxOpacity, 
            y: boxY,
            rotateX: boxRotateX,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity"
          }}
          className="relative w-[280px] h-[320px] md:w-[400px] md:h-[450px] z-20 mt-20"
        >
          {/* Ambient light around the box */}
          <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_60%)] pointer-events-none" />

          {/* Box Bottom */}
          <div className="absolute inset-0 bg-gradient-to-br from-luaz-card to-luaz-bg-soft border border-[rgba(29,29,31,0.1)] rounded-2xl shadow-[0_24px_80px_rgba(70,60,45,0.12)] overflow-hidden flex items-center justify-center">
            
            <motion.div 
              style={{ opacity: glowOpacity, scale: glowScale, willChange: "transform, opacity" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,160,106,0.15)_0%,transparent_70%)] blur-2xl z-0"
            />
            
            {/* Box interior walls */}
            <div className="absolute inset-2 border border-[rgba(29,29,31,0.05)] rounded-xl bg-luaz-stone/30 shadow-[inset_0_20px_50px_rgba(70,60,45,0.05)] z-10" />
            
            {/* Box interior content (revealed when open) */}
            <motion.div 
              style={{ opacity: glowOpacity, willChange: "opacity" }}
              className="relative z-20 text-center"
            >
              <p className="text-luaz-text-muted uppercase tracking-[0.3em] text-[10px] mb-2">Inside</p>
              <p className="text-luaz-text font-serif italic text-2xl md:text-3xl">Five Cues</p>
            </motion.div>
          </div>

          {/* Box Lid */}
          <motion.div 
            style={{ 
              rotateX: lidRotateX,
              y: lidY,
              z: lidZ,
              transformOrigin: "top",
              transformStyle: "preserve-3d",
              willChange: "transform"
            }}
            className="absolute inset-0 z-30"
          >
            <div className="w-full h-full bg-luaz-card border border-[rgba(29,29,31,0.08)] rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden backface-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5)_0%,transparent_80%)]" />
              <span className="text-luaz-text-muted/60 tracking-[0.6em] font-light uppercase text-sm drop-shadow-sm">LUAZ</span>
            </div>
            {/* Inner Lid */}
            <div className="absolute inset-0 bg-luaz-stone/20 rounded-2xl border border-[rgba(29,29,31,0.05)] shadow-[inset_0_0_20px_rgba(70,60,45,0.05)]" style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }} />
          </motion.div>
          
        </motion.div>

      </div>
    </section>
  );
}
