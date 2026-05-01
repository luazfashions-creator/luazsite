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
  const boxOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);
  const boxY = useTransform(scrollYProgress, [0, 0.4], [150, 0]);
  const boxRotateX = useTransform(scrollYProgress, [0, 0.4], [30, 10]);
  
  // Text appearance
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.5, 0.6], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.2], [40, 0]);

  // Lid opening sequence
  const lidRotateX = useTransform(scrollYProgress, [0.4, 0.65], [0, -120]);
  const lidY = useTransform(scrollYProgress, [0.4, 0.65], [0, -40]);
  const lidZ = useTransform(scrollYProgress, [0.4, 0.65], [0, -20]);

  // Inner Glow when box opens
  const glowOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const glowScale = useTransform(scrollYProgress, [0.45, 0.7], [0.8, 1.4]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#050505]" id="ritual">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1200px]">
        
        <motion.div 
          style={{ opacity: textOpacity, y: textY, willChange: "transform, opacity" }}
          className="absolute top-[20%] z-30 text-center w-full px-4"
        >
          <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 font-medium">
            After the first breath
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6">
            The ritual begins.
          </h2>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent mx-auto mt-8" />
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
          <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

          {/* Box Bottom */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a] border border-white/[0.08] rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">
            
            <motion.div 
              style={{ opacity: glowOpacity, scale: glowScale, willChange: "transform, opacity" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,178,142,0.4)_0%,transparent_70%)] blur-2xl z-0"
            />
            
            {/* Box interior walls */}
            <div className="absolute inset-2 border border-white/5 rounded-xl bg-[#050505] shadow-[inset_0_20px_50px_rgba(0,0,0,0.9)] z-10" />
            
            {/* Box interior content (revealed when open) */}
            <motion.div 
              style={{ opacity: glowOpacity, willChange: "opacity" }}
              className="relative z-20 text-center"
            >
              <p className="text-white/30 uppercase tracking-[0.3em] text-[10px] mb-2">Inside</p>
              <p className="text-white font-serif italic text-2xl md:text-3xl">Five Cues</p>
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
            <div className="w-full h-full bg-gradient-to-tr from-[#1a1a1a] to-[#252525] border border-white/[0.12] rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden backface-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_80%)]" />
              <span className="text-white/20 tracking-[0.6em] font-light uppercase text-sm drop-shadow-lg">LUAZ</span>
            </div>
            {/* Inner Lid */}
            <div className="absolute inset-0 bg-[#080808] rounded-2xl border border-white/[0.03] shadow-[inset_0_0_40px_rgba(0,0,0,1)]" style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }} />
          </motion.div>
          
        </motion.div>

      </div>
    </section>
  );
}
