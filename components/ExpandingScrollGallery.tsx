"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const items = [
  {
    id: "salt",
    title: "Bath Salt",
    media: "/bathsalt.mp4",
    history: "Mineral bathing dates back to ancient Rome and the Dead Sea, used by nobility to restore the body after exertion.",
    science: "Transdermal magnesium absorption relaxes muscles, while the post-bath drop in core body temperature mimics the circadian sleep trigger.",
    tagline: "01 / Warmth"
  },
  {
    id: "oil",
    title: "Essential Oil & Diffuser",
    media: "/essential_oil.mp4",
    history: "Distilled for centuries in European monasteries, lavender oil was the premier remedy for restlessness and melancholy.",
    science: "Inhalation of pure lavender extract has been clinically shown to increase slow-wave (deep) sleep and lower resting heart rate.",
    tagline: "02 / Aromatherapy"
  },
  {
    id: "tea",
    title: "Chamomile Tea",
    media: "/chamomilevideo.mp4",
    history: "Used since ancient Egypt, chamomile was revered as a sacred herb for its profound healing and calming properties.",
    science: "Apigenin, a bioflavonoid in chamomile, binds to GABA receptors in the brain to actively reduce anxiety and initiate the sleep cycle.",
    tagline: "03 / Signal"
  },
  {
    id: "socks",
    title: "Hemp Socks",
    media: "/hempsocks.mp4",
    history: "Woven from one of the oldest domesticated crops, hemp has provided durable, breathable warmth since ancient times.",
    science: "Warming the extremities causes rapid vasodilation, redirecting heat from the core to the skin, which powerfully signals the brain to sleep.",
    tagline: "04 / Comfort"
  }
];

function GalleryItem({ 
  item, 
  index, 
  progress, 
  total 
}: { 
  item: typeof items[0]; 
  index: number; 
  progress: MotionValue<number>; 
  total: number;
}) {
  const range = 1 / (total - 1);
  const center = index * range;

  // Animation values for the video container
  const x = useTransform(progress, [center - range, center, center + range], ["45vw", "0vw", "-45vw"]);
  const scale = useTransform(progress, [center - range, center, center + range], [0.65, 1, 0.65]);
  const opacity = useTransform(
    progress, 
    [center - range * 1.5, center - range, center, center + range, center + range * 1.5], 
    [0, 0.3, 1, 0.3, 0]
  );
  const filter = useTransform(
    progress,
    [center - range, center, center + range],
    ["blur(8px) brightness(0.4)", "blur(0px) brightness(1)", "blur(8px) brightness(0.4)"]
  );

  // Animation values for the text overlay
  const textOpacity = useTransform(progress, [center - range * 0.4, center, center + range * 0.4], [0, 1, 0]);
  const textY = useTransform(progress, [center - range * 0.4, center, center + range * 0.4], [30, 0, -30]);

  return (
    <motion.div
      style={{ x, scale, opacity, filter, willChange: "transform, opacity, filter" }}
      className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
    >
      <div className="relative aspect-[4/5] w-[85vw] max-w-[600px] overflow-hidden rounded-[20px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] md:aspect-[16/10] md:w-[70vw] md:max-w-[1100px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={item.media} type="video/mp4" />
        </video>

        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_10%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.9)_90%)]"
        />

        <motion.div 
          style={{ opacity: textOpacity, y: textY, willChange: "transform, opacity" }}
          className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-6 sm:p-10 md:p-14"
        >
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/50 md:text-xs">
            {item.tagline}
          </p>
          <h2 className="mb-6 text-4xl font-light text-white sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
            {item.title}
          </h2>
          
          <div className="grid gap-6 border-t border-white/10 pt-6 md:grid-cols-2 md:gap-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">European History</p>
              <p className="mt-3 text-sm font-light leading-relaxed text-white/80 md:text-base">
                {item.history}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c9a16c]/80">Clinical Science</p>
              <p className="mt-3 text-sm font-light leading-relaxed text-white/90 md:text-base">
                {item.science}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ExpandingScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll timeline that lasts for 400vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="theme-section relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden theme-section-bg perspective-[1000px]">
        {/* Subtle background glow */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(201,178,142,0.05)_0%,transparent_60%)]" />
        
        <div className="relative z-10 h-full w-full">
          {items.map((item, index) => (
            <GalleryItem 
              key={item.id} 
              item={item} 
              index={index} 
              progress={scrollYProgress} 
              total={items.length} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
