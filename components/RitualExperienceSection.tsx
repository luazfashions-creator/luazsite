import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const objects = [
  { id: "tea", label: "Signal", name: "Chamomile Tea", image: "/chamomile.jpg" },
  { id: "salt", label: "Warmth", name: "Bath Salt", image: "/bath_salt.jpeg" },
  { id: "oil", label: "Scent", name: "Essential Oil", image: "/lavender_essential_oil.jpeg" },
  { id: "diffuser", label: "Environment", name: "Diffuser", image: "/diffuser.jpg" },
  { id: "socks", label: "Comfort", name: "Hemp Socks", image: "/hempsocks.webp" }
];

const desktopLayouts = [
  { x: "-36vw", y: "-8vh", rotate: -8, scale: 0.92 },
  { x: "-18vw", y: "15vh", rotate: 4, scale: 0.86 },
  { x: "0vw", y: "-18vh", rotate: 0, scale: 1 },
  { x: "18vw", y: "15vh", rotate: -4, scale: 0.86 },
  { x: "36vw", y: "-8vh", rotate: 8, scale: 0.92 }
];

const mobileLayouts = [
  { x: "-31vw", y: "-13.5vh", rotate: -8, scale: 0.9 },
  { x: "0vw", y: "-14.5vh", rotate: 3, scale: 0.94 },
  { x: "31vw", y: "-13.5vh", rotate: 8, scale: 0.9 },
  { x: "-18vw", y: "15vh", rotate: -4, scale: 0.94 },
  { x: "18vw", y: "15vh", rotate: 5, scale: 0.94 }
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function FloatingObject({
  isDesktop,
  obj,
  index,
  scrollYProgress
}: {
  isDesktop: boolean;
  obj: (typeof objects)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const layout = (isDesktop ? desktopLayouts : mobileLayouts)[index];
  const enterStart = 0.34 + index * 0.025;
  const enterEnd = 0.62 + index * 0.015;

  const x = useTransform(scrollYProgress, [enterStart, enterEnd], ["0vw", layout.x]);
  const y = useTransform(scrollYProgress, [enterStart, enterEnd], ["20vh", layout.y]);
  const scale = useTransform(scrollYProgress, [enterStart, enterEnd, 0.9, 0.98], [0.34, layout.scale, layout.scale, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.3, enterStart, enterEnd, 0.94, 1], [0, 0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [enterStart, enterEnd], [0, layout.rotate]);
  const textOpacity = useTransform(scrollYProgress, [0.58, 0.7, 0.94, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.58, 0.7], [10, 0]);

  return (
    <motion.div
      style={{ x, y, scale, opacity, rotate, willChange: "transform, opacity" }}
      className="pointer-events-none absolute z-40 flex flex-col items-center"
    >
      <div className="theme-media relative h-[28vw] min-h-[94px] max-h-[128px] w-[22vw] min-w-[74px] max-w-[96px] overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04] shadow-[0_24px_74px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:h-[32vw] sm:max-h-[168px] sm:w-[24vw] sm:max-w-[126px] md:h-[196px] md:w-[140px] md:max-w-none lg:h-[228px] lg:w-[164px] xl:h-[252px] xl:w-[184px]">
        <Image 
          src={obj.image} 
          alt={obj.name}
          fill
          className="object-cover opacity-90"
          sizes="(max-width: 640px) 22vw, (max-width: 768px) 24vw, (max-width: 1280px) 164px, 184px"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,5,0.08),rgba(4,5,5,0.12)_42%,rgba(4,5,5,0.78))]" />
        <div className="absolute inset-[7px] rounded-[5px] border border-white/10" />
        <span className="absolute bottom-3 left-3 z-10 text-[8px] font-medium uppercase tracking-[0.22em] text-white/60 md:text-[9px]">
          {obj.id}
        </span>
      </div>
      
      <motion.div 
        style={{ opacity: textOpacity, y: textY, willChange: "transform, opacity" }}
        className="mt-2 hidden max-w-[120px] rounded-full border border-white/10 bg-black/40 px-3 py-2 text-center shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-md sm:block md:mt-4 md:max-w-[168px] md:px-5"
      >
        <h3 className="truncate text-[10px] font-light tracking-wide text-white md:text-sm">{obj.name}</h3>
        <p className="mt-1 text-[7px] uppercase tracking-[0.28em] text-white/40 md:text-[9px]">{obj.label}</p>
      </motion.div>
    </motion.div>
  );
}

export default function RitualExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const boxScale = useTransform(scrollYProgress, [0, 0.22, 0.42, 0.55], [0.58, 1.05, 1.05, 0.52]);
  const boxOpacity = useTransform(scrollYProgress, [0, 0.08, 0.48, 0.6], [0, 1, 1, 0]);
  const boxY = useTransform(scrollYProgress, [0, 0.22, 0.55], [120, 0, 24]);
  const boxRotateX = useTransform(scrollYProgress, [0, 0.22], [26, 8]);
  
  const textOpacity = useTransform(scrollYProgress, [0.03, 0.13, 0.25, 0.34], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.03, 0.13, 0.34], [36, 0, -20]);
  const finalTextOpacity = useTransform(scrollYProgress, [0.66, 0.76, 0.94, 1], [0, 1, 1, 0]);
  const finalTextY = useTransform(scrollYProgress, [0.66, 0.76], [20, 0]);

  const lidRotateX = useTransform(scrollYProgress, [0.22, 0.4], [0, -118]);
  const lidY = useTransform(scrollYProgress, [0.22, 0.4], [0, -34]);
  const lidZ = useTransform(scrollYProgress, [0.22, 0.4], [0, -18]);

  const glowOpacity = useTransform(scrollYProgress, [0.26, 0.45, 0.82, 0.96], [0, 1, 0.8, 0]);
  const glowScale = useTransform(scrollYProgress, [0.26, 0.62], [0.78, 1.65]);
  const stageGlowOpacity = useTransform(scrollYProgress, [0.3, 0.54, 0.9, 1], [0, 0.48, 0.34, 0]);

  return (
    <section ref={containerRef} className="theme-section relative h-[430vh] bg-[#050505] md:h-[480vh]" id="ritual">
      <div className="theme-section-bg perspective-[1200px] sticky top-0 flex h-[100svh] min-h-[560px] w-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(201,178,142,0.12),transparent_38%),linear-gradient(180deg,#050505,#0b0c0b_52%,#050505)] md:min-h-[620px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20" />
        
        <motion.div 
          style={{ opacity: textOpacity, y: textY, willChange: "transform, opacity" }}
          className="absolute top-[10%] z-30 w-full px-5 text-center sm:top-[12%] md:top-[16%]"
        >
          <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.32em] text-white/40 sm:text-[10px] md:mb-5 md:text-xs md:tracking-[0.4em]">
            After the first breath
          </p>
          <h2 className="mb-4 text-[2.35rem] font-light leading-none tracking-tight text-white sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
            The ritual begins.
          </h2>
          <div className="mx-auto mt-6 h-12 w-px bg-gradient-to-b from-white/30 to-transparent md:mt-8 md:h-16" />
        </motion.div>

        <motion.div 
          style={{ 
            scale: boxScale, 
            opacity: boxOpacity, 
            y: boxY,
            rotateX: boxRotateX,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity"
          }}
          className="relative z-20 mt-8 h-[68vw] min-h-[214px] max-h-[282px] w-[68vw] min-w-[214px] max-w-[282px] md:h-[390px] md:w-[390px] md:max-w-none"
        >
          <div className="theme-media absolute inset-0 flex items-center justify-center overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0a0a0a] shadow-[0_44px_120px_rgba(0,0,0,0.78)]">
            <Image 
              src="/back_box_sample_1.png"
              alt="Box interior"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 68vw, 390px"
            />
            
            <motion.div 
              style={{ opacity: glowOpacity, scale: glowScale, willChange: "transform, opacity" }}
              className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(201,178,142,0.62)_0%,transparent_70%)] blur-2xl"
            />
            
            <div className="absolute inset-0 z-10 bg-black/40" />
          </div>

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
            <div className="theme-media relative flex h-full w-full items-center justify-center overflow-hidden rounded-[18px] bg-[#111] shadow-[0_54px_140px_rgba(0,0,0,0.66)] [backface-visibility:hidden]">
              <Image 
                src="/box_sample_front.png"
                alt="LUAZ Box"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 68vw, 390px"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center rounded-[18px] border border-white/[0.03] bg-[#080808] shadow-[inset_0_0_40px_rgba(0,0,0,1)]" style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}>
              <span className="text-xs uppercase tracking-[0.4em] text-white/10">The ritual begins</span>
            </div>
          </motion.div>
        </motion.div>

        {objects.map((obj, i) => (
          <FloatingObject
            key={obj.id}
            isDesktop={isDesktop}
            obj={obj}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <motion.div 
          style={{ opacity: stageGlowOpacity }}
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_0%,transparent_64%)]"
        />

        <motion.div 
          style={{ opacity: finalTextOpacity, y: finalTextY }}
          className="absolute bottom-5 z-50 flex flex-col items-center gap-2 px-5 text-center sm:bottom-7 md:bottom-10 md:gap-3"
        >
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/40 md:text-[10px] md:tracking-[0.36em]">Complete ritual system</p>
          <p className="max-w-[300px] text-xs font-light leading-5 text-white/70 sm:max-w-[420px] md:max-w-[520px] md:text-base md:leading-6">
            Five sensory cues arranged into one evening transition.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
