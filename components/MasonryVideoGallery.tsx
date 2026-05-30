"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GalleryItem = {
  id: string;
  title: string;
  media: string;
  history: string;
  story: string;
  science: string;
  className: string;
};

const items: GalleryItem[] = [
  {
    id: "tea",
    title: "Chamomile Tea",
    media: "/chamomilevideo.mp4",
    history: "Used since ancient Egypt, chamomile was revered as a sacred herb for its profound healing and calming properties.",
    story: "A quiet, warm cup acts as the first deliberate pause. It forces you to slow down and savor the transition into the evening.",
    science: "Apigenin, a bioflavonoid in chamomile, binds to GABA receptors in the brain to actively reduce anxiety and initiate the sleep cycle.",
    className: "md:col-span-7 md:row-span-4 aspect-[16/10] mt-4 md:mt-0"
  },
  {
    id: "salt",
    title: "Bath Salt",
    media: "/bathsalt.mp4",
    history: "Mineral bathing dates back to ancient Rome and the Dead Sea, used by nobility to restore the body after exertion.",
    story: "Submerging in stillness. The water absorbs the noise of the day, leaving only the sensation of weightlessness.",
    science: "Transdermal magnesium absorption relaxes muscles, while the post-bath drop in core body temperature mimics the circadian sleep trigger.",
    className: "md:col-span-5 md:row-span-6 aspect-[3/4] md:mt-16"
  },
  {
    id: "oil",
    title: "Essential Oil",
    media: "/essential_oil.mp4",
    history: "Distilled for centuries in European monasteries, lavender oil was the premier remedy for restlessness and melancholy.",
    story: "A drop of scent that anchors the room. It creates a powerful sensory trigger—when this scent fills the air, sleep is imminent.",
    science: "Inhalation of pure lavender extract has been clinically shown to increase slow-wave (deep) sleep and lower resting heart rate.",
    className: "md:col-span-5 md:row-span-4 aspect-[4/3] md:-mt-12"
  },
  {
    id: "socks",
    title: "Hemp Socks",
    media: "/hempsocks.mp4",
    history: "Woven from one of the oldest domesticated crops, hemp has provided durable, breathable warmth since ancient times.",
    story: "The final layer of comfort. Soft pressure on the feet closes the ritual, locking in the warmth generated throughout the evening.",
    science: "Warming the extremities causes rapid vasodilation, redirecting heat from the core to the skin, which powerfully signals the brain to sleep.",
    className: "md:col-span-7 md:row-span-5 aspect-[16/11] md:mt-4"
  }
];

export default function MasonryVideoGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="theme-section relative min-h-[100svh] bg-[#050505] px-4 py-24 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 text-center md:mb-24 md:text-left">
          <p className="text-[10px] uppercase tracking-[0.36em] text-white/40 md:text-[11px]">
            The Ritual Elements
          </p>
          <h2 className="mt-4 text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Everything is visible
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-9 md:gap-8 lg:gap-12">
          {items.map((item) => {
            const isHovered = hoveredId === item.id;
            const isFaded = hoveredId !== null && hoveredId !== item.id;

            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-[16px] border border-white/5 bg-[#0a0a0a] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${item.className} ${
                  isHovered ? "z-30 scale-[1.02] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-white/20" : "z-10"
                } ${isFaded ? "opacity-30 blur-[2px] grayscale-[50%]" : "opacity-100"}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                >
                  <source src={item.media} type="video/mp4" />
                </video>
                
                <div 
                  className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                    isHovered ? "opacity-75" : "opacity-10 hover:opacity-0"
                  }`} 
                />

                <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end">
                  <h3 className={`font-light text-white transition-all duration-700 ease-out ${
                    isHovered ? "translate-y-0 text-3xl sm:text-4xl md:text-5xl" : "translate-y-4 text-2xl sm:text-3xl"
                  }`}>
                    {item.title}
                  </h3>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 10, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6 flex flex-col gap-5 overflow-hidden"
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">History</p>
                            <p className="mt-2 text-xs font-light leading-relaxed text-white/80 sm:text-sm">{item.history}</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">Story</p>
                            <p className="mt-2 text-xs font-light leading-relaxed text-white/80 sm:text-sm">{item.story}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2 rounded-[8px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                          <p className="text-[9px] uppercase tracking-[0.25em] text-white/50">Clinical Science</p>
                          <p className="mt-2 text-xs font-light leading-relaxed text-white sm:text-sm">
                            {item.science}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
