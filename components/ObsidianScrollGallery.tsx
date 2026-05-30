"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

type ScrollItem = {
  id: string;
  name: string;
  label: string;
  science: string;
  videoUrl: string;
  imageUrl: string;
};

const items: ScrollItem[] = [
  {
    id: "01",
    name: "Thermal Bath Salt",
    label: "Descent",
    science: "Transdermal magnesium relaxes muscles while lowering core body temperature.",
    videoUrl: "/bathsalt.mp4",
    imageUrl: "/assets/back_box_sample_1.png",
  },
  {
    id: "02",
    name: "LUAZ Essential Oil",
    label: "Scent",
    science: "Pure lavender inhalation increases slow-wave sleep and lowers heart rate.",
    videoUrl: "/essential_oil.mp4",
    imageUrl: "/assets/essential_oil_box.png",
  },
  {
    id: "03",
    name: "Chamomile Tea",
    label: "Signal",
    science: "Apigenin bioflavonoids actively bind to GABA receptors to reduce anxiety.",
    videoUrl: "/chamomilevideo.mp4",
    imageUrl: "/chamomile.jpg",
  },
  {
    id: "04",
    name: "Hemp Socks",
    label: "Comfort",
    science: "Extremity warming redirects heat from the core to trigger the sleep signal.",
    videoUrl: "/hempsocks.mp4",
    imageUrl: "/assets/socks_box.png",
  }
];

function GalleryItem({ 
  item, 
  index, 
  progress 
}: { 
  item: ScrollItem; 
  index: number; 
  progress: MotionValue<number> 
}) {
  // Delay the start so the title has time to be seen
  // Total 4 items across scroll progress 0.15 to 1.0
  const duration = 0.85 / 4; // 0.2125
  const start = 0.15 + (index * duration);
  const peak = start + (duration / 2);
  const end = start + duration;

  // Fade in sharply, hold, fade out sharply
  const opacity = useTransform(progress, [start, start + 0.04, end - 0.04, end], [0, 1, 1, 0]);
  
  // Image starts small (0.85), scales up to full size (1.15)
  const scale = useTransform(progress, [start, peak, end], [0.85, 1, 1.15]);
  const y = useTransform(progress, [start, peak, end], [120, 0, -120]);
  
  // Text parallax moves slightly faster/differently for depth
  const textY = useTransform(progress, [start, peak, end], [80, 0, -80]);

  return (
    <motion.div 
      style={{ opacity, pointerEvents: useTransform(opacity, (v) => v > 0.5 ? "auto" : "none") }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 md:flex-row md:justify-between md:p-24"
    >
      {/* Media Side */}
      <motion.div 
        style={{ scale, y }}
        className="relative z-10 w-full max-w-[320px] overflow-hidden rounded-[16px] border border-black/5 shadow-[0_40px_80px_rgba(0,0,0,0.07)] md:max-w-[480px] lg:max-w-[600px] aspect-[4/5]"
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 h-full w-full object-cover saturate-[1.1] brightness-[1.05]"
        >
          <source src={item.videoUrl} type="video/mp4" />
        </video>
        {/* Subtle internal gradient for text legibility if needed, but keeping it clean */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>

      {/* Copy Side */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-20 mt-12 w-full max-w-[400px] text-center md:mt-0 md:text-left md:ml-16"
      >
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-black/40 md:text-[11px]">
          {item.id} &mdash; {item.label}
        </p>
        <h2 className="mb-6 font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
          {item.name}
        </h2>
        
        {/* Glassmorphic Science Box */}
        <div className="mx-auto rounded-[12px] border border-black/5 bg-white/40 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl md:mx-0">
          <p className="text-[11px] font-medium uppercase tracking-widest text-black/60 mb-2">
            Clinical Science
          </p>
          <p className="text-[13px] font-light leading-relaxed text-black/80">
            {item.science}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ObsidianScrollGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Global title fades out quickly as you start scrolling
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.05], [0, -40]);

  return (
    <section ref={containerRef} className="theme-section relative h-[500vh] bg-[var(--theme-page)]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Background noise/grain for ultra-premium texture */}
        <div className="luaz-noise absolute inset-0 opacity-[0.3] mix-blend-overlay" />
        
        {/* Global Intro Title */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-full px-6 text-center"
        >
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.4em] text-black/40">
            The DEEP System
          </p>
          <h2 className="font-serif text-5xl leading-[0.9] tracking-tighter text-white md:text-7xl lg:text-[7rem]">
            You transition <br className="hidden md:block" /> into DEEP.
          </h2>
        </motion.div>

        {/* The Scroll Sequence */}
        {items.map((item, index) => (
          <GalleryItem key={item.id} item={item} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
