"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type MediaType = "video" | "image";

interface RitualStep {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  mediaType: MediaType;
  src: string;
  posterSrc?: string;
  fallbackDurationSeconds?: number;
}

const steps: RitualStep[] = [
  {
    id: "box",
    eyebrow: "THE RITUAL BEGINS",
    headline: "An evening, composed for you.",
    body: "A complete ritual of warmth, scent, touch and stillness—revealed one moment at a time.",
    mediaType: "video",
    src: "/media/box/luaz-box-opening.mp4",
    posterSrc: "/media/box/luaz-box-closed.webp",
    fallbackDurationSeconds: 4
  },
  {
    id: "salt",
    eyebrow: "01 — SOAK",
    headline: "Let warmth carry the day away.",
    body: "Mineral-rich bath salts invite the body to soften and the evening to begin.",
    mediaType: "video",
    src: "/media/ritual/bath-salt.mp4",
    posterSrc: "/media/products/bath-salt.webp",
    fallbackDurationSeconds: 4
  },
  {
    id: "oil",
    eyebrow: "02 — SCENT",
    headline: "A few drops. A quieter state of mind.",
    body: "A calming botanical blend created to transform the atmosphere around you.",
    mediaType: "video",
    src: "/media/ritual/essential-oil.mp4",
    posterSrc: "/media/products/essential-oil.webp",
    fallbackDurationSeconds: 4
  },
  {
    id: "diffuser",
    eyebrow: "03 — ATMOSPHERE",
    headline: "Let the room exhale with you.",
    body: "A subtle aroma that marks the transition from activity to rest.",
    mediaType: "video",
    src: "/media/ritual/diffuser.mp4",
    posterSrc: "/media/products/diffuser.webp",
    fallbackDurationSeconds: 4
  },
  {
    id: "socks",
    eyebrow: "04 — SOFTEN",
    headline: "Comfort, from the ground up.",
    body: "A gentle layer of warmth and softness for the final hours of the day.",
    mediaType: "video",
    src: "/media/ritual/socks.mp4",
    posterSrc: "/media/products/socks.webp",
    fallbackDurationSeconds: 4
  },
  {
    id: "tea",
    eyebrow: "05 — SIP",
    headline: "Slow the evening from within.",
    body: "A warm infusion for the quiet space between doing and resting.",
    mediaType: "video",
    src: "/media/ritual/tea.mp4",
    posterSrc: "/media/products/tea.webp",
    fallbackDurationSeconds: 4
  },
  {
    id: "final",
    eyebrow: "THE COMPLETE LUAZ RITUAL",
    headline: "Everything your evening needs to become a ritual.",
    body: "One box. Five sensory moments. A calmer way to end the day.",
    mediaType: "image",
    src: "/media/box/luaz-box-open.webp",
    fallbackDurationSeconds: 6
  }
];

export default function BoxRitualSequence() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Intersection Observer for pausing/playing when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.4 } // Trigger when 40% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Play/Pause logic based on state & visibility
  useEffect(() => {
    const step = steps[activeStep];
    const video = videoRefs.current[activeStep];

    if (!reducedMotion && isPlaying && isInView && step.mediaType === "video" && video) {
      video.play().catch(() => {
        // Autoplay blocked fallback
        setIsPlaying(false);
      });
    } else {
      Object.values(videoRefs.current).forEach(v => {
        if (v) v.pause();
      });
    }

    // Timer fallback for images or unplayable videos
    if (isPlaying && isInView) {
      if (step.mediaType === "image" || reducedMotion) {
        timerRef.current = setTimeout(() => {
          advanceSequence();
        }, (step.fallbackDurationSeconds || 5) * 1000);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeStep, isPlaying, isInView, reducedMotion]);

  const advanceSequence = useCallback(() => {
    setActiveStep(prev => {
      if (prev < steps.length - 1) return prev + 1;
      setIsPlaying(false);
      return prev;
    });
  }, []);

  const handleVideoEnded = () => {
    if (isPlaying) advanceSequence();
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const handleReplay = () => {
    setActiveStep(0);
    setIsPlaying(true);
    Object.values(videoRefs.current).forEach(v => {
      if (v) v.currentTime = 0;
    });
  };

  const goPrev = () => {
    setActiveStep(prev => Math.max(0, prev - 1));
    Object.values(videoRefs.current).forEach(v => {
      if (v) v.currentTime = 0;
    });
  };

  const goNext = () => {
    if (activeStep < steps.length - 1) {
      advanceSequence();
    }
    Object.values(videoRefs.current).forEach(v => {
      if (v) v.currentTime = 0;
    });
  };

  // Ensure first play when entering viewport the first time
  useEffect(() => {
    if (isInView && activeStep === 0 && !isPlaying && !reducedMotion) {
      setIsPlaying(true);
    }
  }, [isInView, activeStep, isPlaying, reducedMotion]);

  const currentStep = steps[activeStep];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-[80vh] bg-[#121110] text-[#f5f3ef] flex flex-col md:flex-row items-center justify-center overflow-hidden py-24 md:py-0"
      id="ritual"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center z-10">
        
        {/* Media Frame */}
        <div className="md:col-span-7 lg:col-span-8 relative w-full h-[50vh] md:h-[75vh] flex items-center justify-center">
          <div className="relative w-full h-full max-w-[800px] bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/5 shadow-2xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {currentStep.mediaType === "video" && !reducedMotion ? (
                  <video
                    ref={el => {
                      if (el) videoRefs.current[activeStep] = el;
                    }}
                    src={currentStep.src}
                    poster={currentStep.posterSrc}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload={activeStep === 0 ? "auto" : "metadata"}
                    onEnded={handleVideoEnded}
                  />
                ) : (
                  <Image
                    src={currentStep.mediaType === "image" ? currentStep.src : currentStep.posterSrc || currentStep.src}
                    alt={currentStep.headline}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority={activeStep === 0}
                  />
                )}
                
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Text & Controls */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center max-w-[480px]">
          
          <div className="h-[200px] md:h-[240px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9b28e]/80">
                    {String(activeStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                  </span>
                  <div className="h-[1px] w-12 bg-[#c9b28e]/40" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                    {currentStep.eyebrow}
                  </span>
                </div>
                
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 text-[#f5f3ef]">
                  {currentStep.headline}
                </h2>
                
                <p className="text-sm md:text-base font-light text-white/70 leading-relaxed">
                  {currentStep.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={goPrev} 
                disabled={activeStep === 0}
                className="text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-2"
                aria-label="Previous step"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/5 transition-all"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M5 3l14 9-14 9V3z"/></svg>
                )}
              </button>

              <button 
                onClick={goNext} 
                disabled={activeStep === steps.length - 1}
                className="text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-2"
                aria-label="Next step"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={handleReplay}
                className="text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                Replay
              </button>
            </div>
          </div>
          
          {/* CTA on final step */}
          <AnimatePresence>
            {activeStep === steps.length - 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-col gap-3"
              >
                <a href="#acquire" className="w-full py-4 text-center text-xs uppercase tracking-widest bg-[#c9b28e] text-black font-medium hover:bg-[#b8a07c] transition-colors rounded-sm">
                  Discover the Ritual
                </a>
                <a href="#app-companion" className="w-full py-4 text-center text-xs uppercase tracking-widest border border-white/20 text-white hover:bg-white/5 transition-colors rounded-sm">
                  View What&apos;s Inside
                </a>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
