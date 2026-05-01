import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const objects = [
  { id: "tea", label: "Signal", name: "Chamomile Tea", image: "/chamomile.jpg" },
  { id: "salt", label: "Warmth", name: "Bath Salt", image: "/bath_salt.jpeg" },
  { id: "oil", label: "Scent", name: "Essential Oil", image: "/lavender_essential_oil.jpeg" },
  { id: "diffuser", label: "Environment", name: "Diffuser", image: "/diffuser.jpg" },
  { id: "socks", label: "Comfort", name: "Hemp Socks", image: "/lavenderbathsalt.jpg" }
];

function RitualObject({ obj, index, scrollYProgress }: { obj: typeof objects[0], index: number, scrollYProgress: MotionValue<number> }) {
  // Mobile vs Desktop spread calculation could be done with JS but we'll use a fixed wide spread for cinematic effect
  const spreadFactorX = (index - 2) * 320; // Wide horizontal spread
  
  // They float outwards and slightly upwards into an arc
  const x = useTransform(scrollYProgress, [0, 0.4], [0, spreadFactorX]);
  
  const yOffset = Math.abs(index - 2) * 80;
  const y = useTransform(scrollYProgress, [0, 0.4], [200, yOffset - 100]);
  
  // Scale starts from inside the box (small) to full size
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.6, 0.8, 1], [0, 1, 1, 1, 0]);

  const rotate = useTransform(scrollYProgress, [0, 0.4], [0, (index - 2) * 5]); // Slight rotation like cards dealt

  const textOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.4, 0.5], [20, 0]);

  return (
    <motion.div
      style={{ x, y, scale, opacity, rotate, willChange: "transform, opacity" }}
      className="absolute flex flex-col items-center z-20"
    >
      <div className="w-[180px] h-[260px] md:w-[240px] md:h-[340px] rounded-xl liquid-glass flex items-center justify-center relative overflow-hidden border border-white/10 shadow-2xl group">
        <Image 
          src={obj.image} 
          alt={obj.name}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 ease-[0.16,1,0.3,1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <span className="absolute bottom-4 left-4 z-10 text-white/50 text-[10px] tracking-[0.2em] uppercase">{obj.id}</span>
      </div>
      
      <motion.div 
        style={{ opacity: textOpacity, y: textY, willChange: "transform, opacity" }}
        className="mt-8 text-center bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/5"
      >
        <h3 className="text-white text-sm md:text-base font-light tracking-wide">{obj.name}</h3>
        <p className="text-white/40 text-[9px] md:text-[10px] tracking-[0.3em] uppercase mt-1">{obj.label}</p>
      </motion.div>
    </motion.div>
  );
}

export default function RitualBreakdownAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollTextOpacity = useTransform(scrollYProgress, [0.6, 0.7, 0.9], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#050505] -mt-[100vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-[1200px]">
        
        {/* Subtle background glow */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 0.5]) }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none"
        />

        {objects.map((obj, i) => (
          <RitualObject key={obj.id} obj={obj} index={i} scrollYProgress={scrollYProgress} />
        ))}

        <motion.div 
          style={{ opacity: scrollTextOpacity, willChange: "opacity" }}
          className="absolute bottom-12 text-white/40 tracking-[0.3em] uppercase text-[10px] flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
