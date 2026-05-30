"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent } from "framer-motion";
import type { MotionValue } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    id: "bath-salt",
    number: "1/4",
    sense: "TOUCH",
    title: "Himalayan Bath Salt",
    headline: "Touch begins the descent.",
    shortLine: "Warm mineral water becomes the first signal that the day is ending.",
    ethos: "Across European bathing culture, warm mineral water has long been associated with recovery, stillness, and evening restoration.",
    logos: "LUAZ begins with the feet because the ritual must start physically before the mind can follow.",
    pathos: "The first touch of warm water creates a quiet boundary between digital noise and sleep.",
    media: "/bathsalt.mp4",
    fallbackImage: "/bath_salt2.jpeg",
    cta: "Continue to the Companion",
    target: "#app-companion"
  },
  {
    id: "aroma",
    number: "2/4",
    sense: "SMELL",
    title: "Essential Oil & Diffuser",
    headline: "Scent turns the room into a signal.",
    shortLine: "Aroma changes the atmosphere before the body lies down.",
    ethos: "European apothecaries and domestic evening rituals have long used botanicals, resins, woods, and flowers as quiet companions to rest.",
    logos: "The essential oil and diffuser work together so the room itself becomes part of the sleep routine.",
    pathos: "Repeated nightly, the scent becomes familiar — a soft reminder that nothing more is required today.",
    media: "/essential_oil.mp4",
    fallbackImage: "/lavenderbathsalt.jpg",
    cta: "Continue to the Companion",
    target: "#app-companion"
  },
  {
    id: "chamomile-tea",
    number: "3/4",
    sense: "TASTE",
    title: "Chamomile Tea",
    headline: "Taste creates the pause.",
    shortLine: "A warm cup separates the active day from the sleeping night.",
    ethos: "Chamomile has been one of Europe’s most familiar evening herbs for generations.",
    logos: "In LUAZ, tea is not positioned as a medical promise, but as a behavioural pause that slows the transition into sleep.",
    pathos: "Steam, warmth, and slowness turn drinking into a small act of care before bed.",
    media: "/chamomilevideo.mp4",
    fallbackImage: "/chamomile.jpg",
    cta: "Continue to the Companion",
    target: "#app-companion"
  },
  {
    id: "socks",
    number: "4/4",
    sense: "WARMTH",
    title: "Warm Hemp Socks",
    headline: "Warmth closes the ritual.",
    shortLine: "The final step is not another product. It is the closing gesture.",
    ethos: "Warm feet have long belonged to European home comfort rituals before bed.",
    logos: "After water, scent, and tea, the socks keep the body in a state of quiet physical comfort.",
    pathos: "The ritual ends with softness — a simple sign that the body can stop preparing and start resting.",
    media: "/hempsocks.mp4",
    fallbackImage: "/hempsocks.webp",
    cta: "Continue to the Companion",
    target: "#app-companion"
  }
];

type RitualStep = (typeof steps)[number];

function CardMedia({ step, isActive }: { step: RitualStep, isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause based on active state
  // Using useEffect guarantees we don't violate React Hook rules.
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      // Reset video to start for the next time it becomes active
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <>
      <Image
        src={step.fallbackImage}
        alt={step.title}
        fill
        className="object-cover absolute inset-0 z-0 opacity-60"
      />
      <video
        ref={videoRef}
        src={step.media}
        muted
        loop
        playsInline
        preload="metadata"
        className="object-cover absolute inset-0 h-full w-full z-10"
        style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.6s ease" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-20" />
      <div className="absolute bottom-8 left-0 right-0 text-center z-30">
        <h3 className="font-serif italic text-3xl md:text-4xl text-white drop-shadow-md">
          {step.title}
        </h3>
      </div>
    </>
  );
}

function DesktopHeadline({
  step,
  index,
  scrollYProgress
}: {
  step: RitualStep;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const target = index / 3;
  const opacity = useTransform(scrollYProgress, [target - 0.15, target - 0.05, target + 0.05, target + 0.15], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [target - 0.15, target], [20, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 flex flex-col justify-center">
      <h2 className="font-serif text-5xl lg:text-6xl text-luaz-text leading-tight drop-shadow-sm">
        {step.headline}
      </h2>
    </motion.div>
  );
}

function DesktopCard({
  step,
  index,
  activeIndex,
  scrollYProgress
}: {
  step: RitualStep;
  index: number;
  activeIndex: number;
  scrollYProgress: MotionValue<number>;
}) {
  const input = [0, 0.333, 0.666, 1];
  const yVals = input.map((_, idx) => {
    const diff = idx - index;
    if (diff === 0) return 0;
    if (diff > 0) return -80 - (diff - 1) * 40;
    return 90 + Math.abs(diff) * 50;
  });
  const scaleVals = input.map((_, idx) => {
    const diff = idx - index;
    if (diff === 0) return 1;
    if (diff > 0) return 0.84 - (diff - 1) * 0.06;
    return 0.88 - Math.abs(diff - 1) * 0.12;
  });
  const opVals = input.map((_, idx) => {
    const diff = idx - index;
    if (diff === 0) return 1;
    if (diff > 0) return 0.35 - (diff - 1) * 0.2;
    return 0.55 - Math.abs(diff - 1) * 0.3;
  });
  const blurVals = input.map((_, idx) => {
    const diff = idx - index;
    if (diff === 0) return 0;
    if (diff > 0) return 2 + (diff - 1) * 2;
    return 1 + Math.abs(diff - 1) * 2;
  });
  const zIndexVals = input.map((_, idx) => {
    const diff = Math.abs(idx - index);
    return 40 - diff * 10;
  });

  const y = useTransform(scrollYProgress, input, yVals);
  const scale = useTransform(scrollYProgress, input, scaleVals);
  const opacity = useTransform(scrollYProgress, input, opVals);
  const blur = useTransform(scrollYProgress, input, blurVals);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const zIndex = useTransform(scrollYProgress, input, zIndexVals);

  return (
    <motion.div
      style={{ y, scale, opacity, filter, zIndex, willChange: "transform, opacity, filter" }}
      className="absolute w-full max-w-[560px] h-full max-h-[720px] rounded-[22px] border border-[rgba(29,29,31,0.14)] bg-luaz-stone shadow-[0_40px_120px_rgba(70,60,45,0.18)] overflow-hidden"
    >
      <CardMedia step={step} isActive={activeIndex === index} />
    </motion.div>
  );
}

function useStepOpacity(scrollYProgress: MotionValue<number>, target: number, delay: number) {
  return useTransform(
    scrollYProgress,
    [target - 0.15 + delay, target - 0.05 + delay, target + 0.05 + delay, target + 0.15 + delay],
    [0, 1, 1, 0]
  );
}

function DesktopDetails({
  step,
  index,
  scrollYProgress
}: {
  step: RitualStep;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const target = index / 3;
  const numOp = useStepOpacity(scrollYProgress, target, 0);
  const senseOp = useStepOpacity(scrollYProgress, target, 0.02);
  const titleOp = useStepOpacity(scrollYProgress, target, 0.04);
  const copyOp1 = useStepOpacity(scrollYProgress, target, 0.06);
  const copyOp2 = useStepOpacity(scrollYProgress, target, 0.08);
  const copyOp3 = useStepOpacity(scrollYProgress, target, 0.1);
  const btnOp = useStepOpacity(scrollYProgress, target, 0.12);

  return (
    <div className="absolute inset-x-0 flex flex-col justify-center pointer-events-none">
      <motion.p style={{ opacity: numOp }} className="text-xs tracking-[0.3em] font-medium text-luaz-text-muted mb-8">
        {step.number}
      </motion.p>
      <motion.p style={{ opacity: senseOp }} className="text-[10px] tracking-[0.25em] font-medium uppercase text-luaz-gold-soft mb-2">
        {step.sense}
      </motion.p>
      <motion.h3 style={{ opacity: titleOp }} className="font-serif text-2xl lg:text-3xl text-luaz-text mb-6 drop-shadow-sm">
        {step.title}
      </motion.h3>

      <div className="space-y-5 border-t border-luaz-border pt-6 mb-8 text-[15px] leading-relaxed text-luaz-text/90 font-light">
        <motion.p style={{ opacity: copyOp1 }}>
          {step.ethos}
        </motion.p>
        <motion.p style={{ opacity: copyOp2 }}>
          {step.logos}
        </motion.p>
        <motion.p style={{ opacity: copyOp3 }} className="font-serif italic text-[17px] text-luaz-text">
          {step.pathos}
        </motion.p>
      </div>

      <motion.a
        href={step.target}
        style={{ opacity: btnOp }}
        className="self-start inline-flex rounded-full bg-luaz-card border border-luaz-border/60 shadow-sm px-6 py-3 text-sm font-medium text-luaz-text transition-all hover:bg-luaz-bg hover:shadow-md pointer-events-auto"
      >
        {step.cta}
      </motion.a>
    </div>
  );
}

function DesktopSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(3, Math.max(0, Math.round(latest * 3)));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <section ref={containerRef} className="hidden md:block relative h-[400vh] bg-luaz-bg border-t border-luaz-border/50" id="ritual-sequence">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <p className="absolute top-10 left-12 text-[9px] uppercase tracking-[0.3em] text-luaz-text-muted font-medium z-50">
          LUAZ Ritual Sequence
        </p>

        {/* Museum guide line */}
        <div className="absolute top-[52%] left-[8%] right-[8%] h-px bg-luaz-border z-0" />

        <div className="grid grid-cols-12 w-full h-full max-w-[1600px] px-12 items-center">
          
          {/* Left Text: Headline */}
          <div className="col-span-3 relative h-full flex flex-col justify-center">
            {steps.map((step, i) => (
              <DesktopHeadline key={step.id} step={step} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          {/* Center Stacked Cards */}
          <div className="col-span-6 relative h-[70vh] flex items-center justify-center perspective-[1200px] z-20">
            {steps.map((step, i) => (
              <DesktopCard
                key={step.id}
                step={step}
                index={i}
                activeIndex={activeIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Right Text: Details */}
          <div className="col-span-3 relative h-full flex flex-col justify-center">
            {steps.map((step, i) => (
              <DesktopDetails key={step.id} step={step} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function MobileSequence() {
  return (
    <section className="md:hidden bg-luaz-bg border-t border-luaz-border text-luaz-text" id="ritual-sequence-mobile">
      <div className="px-6 py-12 text-center border-b border-luaz-border">
        <p className="text-[10px] uppercase tracking-[0.3em] text-luaz-text-muted font-medium">LUAZ Ritual Sequence</p>
      </div>
      
      {steps.map((step) => (
        <motion.div 
          key={step.id} 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-screen flex flex-col justify-center px-6 py-16 border-b border-luaz-border"
        >
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] font-medium text-luaz-text-muted mb-4">{step.number}</p>
            <h2 className="font-serif text-4xl leading-tight drop-shadow-sm mb-4">
              {step.headline}
            </h2>
            <p className="text-[10px] tracking-[0.25em] font-medium uppercase text-luaz-gold-soft">
              {step.sense}
            </p>
          </div>

          <div className="relative w-full h-[60vh] rounded-2xl border border-[rgba(29,29,31,0.14)] bg-luaz-stone shadow-xl overflow-hidden mb-10">
             <Image
              src={step.fallbackImage}
              alt={step.title}
              fill
              className="object-cover absolute inset-0 z-0 opacity-60"
            />
            {/* Videos natively autoplay on mobile if visible when using intersection observer, but here we just render standard video with autoPlay */}
            <video
              src={step.media}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="object-cover absolute inset-0 h-full w-full z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-20" />
            <div className="absolute bottom-6 left-0 right-0 text-center z-30">
              <h3 className="font-serif italic text-2xl text-white drop-shadow-md">
                {step.title}
              </h3>
            </div>
          </div>

          <div className="space-y-6 text-[15px] font-light leading-relaxed text-luaz-text/90 mb-10">
            <p>
              {step.ethos}
            </p>
            <p>
              {step.logos}
            </p>
            <p className="font-serif italic text-[17px] text-luaz-text">
              {step.pathos}
            </p>
          </div>

          <a 
            href={step.target}
            className="w-full text-center rounded-full bg-luaz-card border border-luaz-border/60 shadow-sm px-6 py-4 text-sm font-medium text-luaz-text transition-all active:bg-luaz-bg"
          >
            {step.cta}
          </a>
        </motion.div>
      ))}
    </section>
  );
}

export function RitualSequence() {
  return (
    <>
      <DesktopSequence />
      <MobileSequence />
    </>
  );
}
