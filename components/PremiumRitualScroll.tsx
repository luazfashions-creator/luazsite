"use client";

import type { MotionValue } from "framer-motion";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";

const luxuryEase = [0.16, 1, 0.3, 1] as const;
const itemSpring = { stiffness: 100, damping: 20, mass: 0.9 };
const layoutSpring = { stiffness: 50, damping: 15, mass: 0.95 };

type FloatingPosition = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

const desktopPositions: FloatingPosition[] = [
  { x: -392, y: -220, rotate: -7, scale: 1.02 },
  { x: -398, y: 86, rotate: 5, scale: 0.96 },
  { x: -38, y: -312, rotate: -2, scale: 1.04 },
  { x: 342, y: -202, rotate: 6, scale: 1 },
  { x: 354, y: 116, rotate: -5, scale: 0.98 }
];

const tabletPositions: FloatingPosition[] = [
  { x: -238, y: -190, rotate: -8, scale: 0.92 },
  { x: -264, y: 78, rotate: 7, scale: 0.88 },
  { x: -18, y: -258, rotate: -2, scale: 0.92 },
  { x: 232, y: -150, rotate: 8, scale: 0.9 },
  { x: 236, y: 104, rotate: -7, scale: 0.9 }
];

const mobilePositions: FloatingPosition[] = [
  { x: -82, y: -204, rotate: -5, scale: 0.54 },
  { x: -88, y: -34, rotate: 4, scale: 0.5 },
  { x: 82, y: -188, rotate: 3, scale: 0.52 },
  { x: 88, y: -20, rotate: -4, scale: 0.5 },
  { x: 0, y: 134, rotate: 2, scale: 0.52 }
];

const roomWindowLayouts = [
  "left-4 top-[18%] w-[26%] max-w-[430px]",
  "left-8 bottom-[12%] w-[24%] max-w-[390px]",
  "left-1/2 bottom-[7%] w-[25%] max-w-[430px] -translate-x-1/2",
  "right-4 top-[20%] w-[27%] max-w-[440px]",
  "right-8 bottom-[10%] w-[25%] max-w-[420px]"
];

const itemContainerVariants = {
  closed: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1
    }
  },
  open: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  closed: {
    filter: "blur(16px)",
    opacity: 0,
    rotate: 0,
    scale: 0.16,
    x: 0,
    y: 54
  },
  open: ({ rotate, scale, x, y }: FloatingPosition) => ({
    filter: "blur(0px)",
    opacity: 1,
    rotate,
    scale,
    x,
    y,
    transition: {
      ...itemSpring,
      type: "spring"
    }
  })
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function useViewportSize() {
  const [size, setSize] = useState({ height: 900, width: 1440 });

  useEffect(() => {
    const update = () => {
      setSize({ height: window.innerHeight, width: window.innerWidth });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

function BlurWord({
  index,
  progress,
  word
}: {
  index: number;
  progress: MotionValue<number>;
  word: string;
}) {
  const start = 0.18 + index * 0.024;
  const opacity = useTransform(progress, [start, start + 0.075], [0, 1]);
  const y = useTransform(progress, [start, start + 0.075], [28, 0]);
  const filter = useTransform(
    progress,
    [start, start + 0.075],
    ["blur(14px)", "blur(0px)"]
  );

  return (
    <motion.span className="inline-block" style={{ filter, opacity, y }}>
      {word}
    </motion.span>
  );
}

function FloatingItem({
  index,
  isOpen,
  position,
  product,
  reduceMotion
}: {
  index: number;
  isOpen: boolean;
  position: FloatingPosition;
  product: (typeof products)[number];
  reduceMotion: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const x = useSpring(magneticX, { stiffness: 170, damping: 22, mass: 0.45 });
  const y = useSpring(magneticY, { stiffness: 170, damping: 22, mass: 0.45 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    magneticX.set(((event.clientX - centerX) / bounds.width) * 18);
    magneticY.set(((event.clientY - centerY) / bounds.height) * 18);
  }

  function handlePointerLeave() {
    setIsHovered(false);
    magneticX.set(0);
    magneticY.set(0);
  }

  return (
    <motion.div
      custom={position}
      variants={itemVariants}
      className="absolute left-1/2 top-1/2 z-30 h-0 w-0 transform-gpu"
      style={{ transformOrigin: "0 0" }}
    >
      <motion.div
        animate={
          isOpen && !reduceMotion
            ? { rotate: [0, index % 2 === 0 ? 1.2 : -1.2, 0], y: [0, -7, 0] }
            : { rotate: 0, y: 0 }
        }
        transition={{
          delay: index * 0.18,
          duration: 5.8 + index * 0.36,
          ease: "easeInOut",
          repeat: isOpen && !reduceMotion ? Infinity : 0
        }}
        className="w-[154px] -translate-x-1/2 -translate-y-1/2 sm:w-[174px] md:w-[236px]"
      >
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{ x, y }}
          whileHover={{
            scale: 1.1,
            transition: { stiffness: 120, damping: 18, mass: 0.65, type: "spring" }
          }}
          className="group overflow-hidden rounded-[8px] border border-[#f6f7f2]/16 bg-[#111514]/68 shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl md:shadow-[0_44px_140px_rgba(0,0,0,0.42)]"
        >
          <div className="relative aspect-[1.55/1] overflow-hidden">
            <img
              src={product.image}
              alt={`${product.name} ritual cue`}
              className="absolute inset-0 h-full w-full object-cover opacity-[0.9] saturate-[0.9] transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:saturate-100"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,246,239,0.02),rgba(17,21,20,0.62))]" />
            <div className="absolute inset-[8px] rounded-[6px] border border-[#f6f7f2]/16" />
            <motion.div
              animate={{
                clipPath: isHovered
                  ? "circle(76% at 50% 50%)"
                  : "circle(0% at 50% 50%)",
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.78, ease: luxuryEase }}
              className="absolute inset-0 grid place-items-center bg-[#181b19]/88"
            >
              <div className="absolute inset-[12%] rounded-[8px] border border-[#f6f7f2]/10 bg-[#f6f7f2]/5" />
              <div className="relative grid h-16 w-16 place-items-center rounded-full border border-[#f6f7f2]/28 bg-[#f6f7f2]/10 backdrop-blur-md">
                <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-[#f6f7f2]" />
              </div>
              <p className="absolute bottom-5 left-5 right-5 text-center text-[10px] uppercase text-[#f6f7f2]/62">
                open window
              </p>
            </motion.div>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-[#f6f7f2]">
              <p className="font-display text-[1.5rem] leading-none md:text-[1.9rem]">
                {product.shortLabel}
              </p>
              <span className="text-[10px] uppercase text-[#f6f7f2]/54">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
          <div className="hidden px-3 py-3 md:px-4 md:py-4">
            <div className="flex items-center justify-between gap-4 text-[10px] uppercase text-luaz-mist/62">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span style={{ color: product.tone }}>{product.shortLabel}</span>
            </div>
            <p className="mt-3 text-[13px] leading-4 text-luaz-paper md:mt-4 md:text-[14px] md:leading-5">
              {product.name}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function PremiumRitualScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1180px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1179px)");
  const { height } = useViewportSize();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);
  const [itemsOpen, setItemsOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, {
    damping: reduceMotion ? 100 : 34,
    mass: 1,
    stiffness: reduceMotion ? 400 : 72
  });

  const layoutProgress = useSpring(scrollYProgress, layoutSpring);

  const floatingPositions = useMemo(() => {
    if (isDesktop) return desktopPositions;
    if (isTablet) return tabletPositions;
    return mobilePositions;
  }, [isDesktop, isTablet]);

  useMotionValueEvent(progress, "change", (latest) => {
    setItemsOpen(latest > 0.66);
  });

  const backgroundScale = useTransform(progress, [0, 0.5, 1], [1.09, 1.02, 1.12]);
  const backgroundY = useTransform(progress, [0, 1], [0, -height * 0.08]);
  const backgroundOpacity = useTransform(progress, [0, 0.22, 1], [1, 0.86, 0.72]);
  const veilOpacity = useTransform(progress, [0, 0.52, 0.9], [0.36, 0.72, 0.52]);

  const luazClipPath = useTransform(
    progress,
    [0.055, 0.18],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const luazOpacity = useTransform(progress, [0.04, 0.08], [0, 1]);
  const luazBreathScale = useTransform(progress, [0.055, 0.18, 0.28], [0.92, 1.045, 1]);
  const luazLetterY = useTransform(progress, [0.055, 0.18], [44, 0]);

  const targetX = 0;
  const targetY = isDesktop ? -height * 0.32 : isTablet ? -height * 0.28 : -height * 0.22;
  const targetScale = isDesktop ? 0.42 : isTablet ? 0.5 : 0.5;

  const brandX = useTransform(layoutProgress, [0.34, 0.56], [0, targetX]);
  const brandY = useTransform(layoutProgress, [0.34, 0.56], [0, targetY]);
  const brandScale = useTransform(layoutProgress, [0.34, 0.56], [1, targetScale]);
  const copyOpacity = useTransform(progress, [0.42, 0.58], [1, 0.54]);
  const copyY = useTransform(progress, [0.42, 0.58], [0, -18]);

  const boxOpacity = useTransform(progress, [0.48, 0.61], [0, 1]);
  const boxY = useTransform(progress, [0.48, 0.63], [122, 0]);
  const boxScale = useTransform(progress, [0.48, 0.63, 0.78], [0.78, 1, 1.075]);
  const boxRotateX = useTransform(progress, [0.48, 0.63, 0.86], [18, 0, -3]);
  const boxRotateY = useTransform(progress, [0.48, 0.63, 0.78], [-14, 0, 4]);
  const boxFilter = useTransform(progress, [0.48, 0.63], ["blur(18px)", "blur(0px)"]);
  const boxBodyScaleX = useTransform(progress, [0.64, 0.79], [1, 1.14]);
  const boxBodyScaleY = useTransform(progress, [0.64, 0.79], [1, 1.08]);
  const lidOpacity = useTransform(progress, [0.66, 0.78], [1, 0.1]);
  const lidY = useTransform(progress, [0.62, 0.82], [0, -132]);
  const lidRotateX = useTransform(progress, [0.62, 0.82], [0, -108]);
  const lidScale = useTransform(progress, [0.62, 0.82], [1, 0.96]);
  const glowOpacity = useTransform(progress, [0.62, 0.82], [0, 1]);
  const roomGlowScale = useTransform(progress, [0.62, 0.86], [0.72, 1.18]);
  const floorOpacity = useTransform(progress, [0.48, 0.68, 0.9], [0, 0.68, 0.9]);
  const galleryOpacity = useTransform(progress, [0.58, 0.7, 0.94], [0, 1, 0.92]);
  const galleryY = useTransform(progress, [0.58, 0.72], [46, 0]);
  const galleryScale = useTransform(progress, [0.58, 0.76], [0.96, 1]);
  const lineScale = useTransform(progress, [0.56, 0.84], [0, 1]);
  const scrollCueOpacity = useTransform(progress, [0, 0.075], [1, 0]);
  const phrase = "Before Sleep Begins".split(" ");

  return (
    <section ref={sectionRef} id="top" className="relative h-[560vh] bg-luaz-void md:h-[680vh]">
      <span id="ritual" className="absolute top-[100vh]" aria-hidden="true" />
      <div className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden bg-[#172b28] md:min-h-[620px]">
        <motion.img
          src="/assets/heroimage.png"
          alt="LUAZ evening ritual atmosphere"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{ opacity: backgroundOpacity, scale: backgroundScale, y: backgroundY }}
          className="absolute inset-0 h-full w-full object-cover object-[48%_center] saturate-[0.95] md:object-[43%_center]"
        />
        <motion.div
          style={{ opacity: veilOpacity }}
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,28,26,0.76),rgba(16,28,26,0.18)_50%,rgba(16,28,26,0.76)),linear-gradient(180deg,rgba(16,28,26,0.06),rgba(16,28,26,0.6)_76%,#eaf0ec_100%)] md:bg-[linear-gradient(90deg,rgba(16,28,26,0.7),rgba(16,28,26,0.08)_42%,rgba(16,28,26,0.72)),linear-gradient(180deg,rgba(16,28,26,0.02),rgba(16,28,26,0.58)_82%,#eaf0ec_100%)]"
        />
        <div className="luaz-noise absolute inset-0 opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(246,247,242,0.045),transparent_44%)]" />
        <div className="pointer-events-none absolute inset-x-5 top-24 z-20 hidden items-center justify-between text-[10px] uppercase text-[#f6f7f2]/58 md:flex">
          <span>A ritual for depth</span>
          <span>One box / five cues / DEEP</span>
        </div>
        <div className="pointer-events-none absolute bottom-24 left-5 top-24 z-20 hidden w-px bg-gradient-to-b from-transparent via-[#f6f7f2]/18 to-transparent md:block" />
        <div className="pointer-events-none absolute bottom-24 right-5 top-24 z-20 hidden w-px bg-gradient-to-b from-transparent via-[#f6f7f2]/18 to-transparent md:block" />

        <motion.div
          style={{ opacity: galleryOpacity, scale: galleryScale, y: galleryY }}
          className="pointer-events-none absolute inset-0 z-20 hidden md:block"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(246,247,242,0.05),transparent_34%),linear-gradient(180deg,rgba(12,16,15,0.08),rgba(12,16,15,0.72))]" />
          <div className="absolute left-[16%] top-0 h-[130%] w-px rotate-45 bg-[#c9a16c]/20" />
          <div className="absolute right-[18%] top-[-10%] h-[130%] w-px -rotate-45 bg-[#f6f7f2]/10" />
          <div className="absolute left-1/2 top-[8%] -translate-x-1/2 text-center">
            <p className="text-[11px] uppercase text-[#f6f7f2]/42">
              A ritual for depth
            </p>
            <p className="mt-2 font-display text-[3.4rem] leading-[0.9] text-[#f6f7f2]/88">
              You do not
              <br />
              fall asleep
            </p>
          </div>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`absolute overflow-hidden rounded-[8px] border border-[#f6f7f2]/16 bg-[#111514]/70 shadow-[0_36px_110px_rgba(0,0,0,0.48)] ${roomWindowLayouts[index]}`}
            >
              <div className="relative aspect-[1.62/1] overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.name} ritual room window`}
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.9] saturate-[0.88]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,21,20,0.02),rgba(17,21,20,0.58))]" />
                <div className="absolute inset-[9px] rounded-[6px] border border-[#f6f7f2]/12" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-[#f6f7f2]">
                  <div>
                    <p className="text-[10px] uppercase text-[#f6f7f2]/48">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-display text-[1.9rem] leading-none">
                      {product.shortLabel}
                    </p>
                  </div>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: product.tone }}
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute left-1/2 top-[44%] z-20 w-[calc(100%_-_32px)] max-w-[1500px] -translate-x-1/2 -translate-y-1/2 text-[#f6f7f2] md:top-1/2 md:w-[calc(100%_-_64px)]">
          <motion.div
            layoutId="luaz-breathe-lockup"
            style={{ scale: brandScale, x: brandX, y: brandY }}
            className="flex flex-col items-center text-center"
          >
            <motion.h1
              style={{
                clipPath: luazClipPath,
                opacity: luazOpacity,
                scale: luazBreathScale,
                y: luazLetterY
              }}
              className="font-display text-[6rem] leading-[0.78] tracking-[-0.04em] sm:text-[7rem] md:text-[13rem] lg:text-[16rem] xl:text-[19rem]"
            >
              DEEP
            </motion.h1>
            <motion.p
              style={{ opacity: copyOpacity, y: copyY }}
              className="mt-5 flex max-w-[21rem] flex-wrap justify-center gap-x-2 gap-y-1 font-display text-[2.05rem] leading-[0.98] text-[#f6f7f2] sm:max-w-none sm:text-[2.35rem] md:mt-5 md:text-[4.6rem]"
            >
              {phrase.map((word, index) => (
                <BlurWord
                  key={word}
                  index={index}
                  progress={progress}
                  word={word}
                />
              ))}
            </motion.p>
            <motion.div
              style={{ opacity: copyOpacity, y: copyY }}
              className="mt-6 hidden max-w-[520px] text-center text-[13px] uppercase leading-6 text-[#f6f7f2]/62 md:block"
            >
              Not sleep. A ritual that prepares your body for the moment sleep begins.
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute left-1/2 top-[64%] z-30 w-[232px] -translate-x-1/2 -translate-y-1/2 sm:w-[276px] md:top-[58%] md:w-[430px] lg:w-[480px]">
          <motion.div
            style={{
              filter: boxFilter,
              opacity: boxOpacity,
              rotateX: boxRotateX,
              rotateY: boxRotateY,
              scale: boxScale,
              y: boxY
            }}
            className="relative h-[348px] transform-gpu sm:h-[410px] md:h-[520px]"
          >
            <div className="absolute inset-0" style={{ perspective: 2200 }}>
              <motion.div
                style={{ opacity: floorOpacity, scale: roomGlowScale }}
                className="absolute left-1/2 top-[72%] h-[44%] w-[140%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(246,247,242,0.26),rgba(120,157,132,0.16)_32%,rgba(0,0,0,0)_70%)] blur-xl"
              />
              <motion.div
                style={{ opacity: floorOpacity }}
                className="absolute left-1/2 top-[80%] h-px w-[132%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(246,247,242,0.32),transparent)]"
              />
              <motion.div
                style={{ scaleX: boxBodyScaleX, scaleY: boxBodyScaleY }}
                className="absolute inset-x-0 bottom-0 h-[72%] overflow-hidden rounded-[8px] border border-[#f6f7f2]/22 bg-[#f6f7f2]/12 shadow-[0_70px_180px_rgba(0,0,0,0.5)] backdrop-blur-[12px] [transform-style:preserve-3d]"
              >
                <motion.div
                  style={{ opacity: glowOpacity }}
                  className="absolute -inset-[18%] bg-[radial-gradient(circle,rgba(246,247,242,0.76),rgba(120,157,132,0.34)_36%,transparent_70%)] blur-2xl"
                />
                <img
                  src="/assets/back_box_sample_1.png"
                  alt="LUAZ ritual box interior"
                  className="absolute inset-0 h-full w-full rounded-[8px] object-cover opacity-[0.42] saturate-[0.86]"
                />
                <div className="absolute inset-0 rounded-[8px] bg-[linear-gradient(135deg,rgba(246,247,242,0.24),rgba(246,247,242,0.04)_36%,rgba(23,43,40,0.34))]" />
                <div className="absolute inset-[10px] rounded-[8px] border border-[#f6f7f2]/14" />
                <div className="absolute left-[12%] right-[12%] top-[18%] h-px bg-[#f6f7f2]/28" />
                <div className="absolute inset-x-[8%] bottom-[16%] h-[16%] rounded-[8px] border border-[#f6f7f2]/10 bg-[#111514]/18 backdrop-blur-sm" />
                <div className="absolute left-[12%] right-[12%] top-[36%] grid grid-cols-5 gap-2 opacity-80">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="aspect-[4/3] overflow-hidden rounded-[4px] border border-[#f6f7f2]/12 bg-[#f6f7f2]/10"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover opacity-70 saturate-[0.82]"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[10px] uppercase text-[#f6f7f2]/58">
                  <span>DEEP</span>
                  <span>complete system</span>
                </div>
              </motion.div>

              <motion.div
                style={{
                  opacity: lidOpacity,
                  rotateX: lidRotateX,
                  scale: lidScale,
                  transformOrigin: "50% 100%",
                  y: lidY
                }}
                className="absolute inset-x-0 top-0 h-[64%] overflow-hidden rounded-[8px] border border-[#f6f7f2]/20 bg-[#f6f7f2]/10 shadow-[0_58px_150px_rgba(0,0,0,0.42)] backdrop-blur-[12px] [transform-style:preserve-3d]"
              >
                <img
                  src="/assets/box_sample_front.jpeg"
                  alt="LUAZ ritual box lid"
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.72]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(246,247,242,0.2),rgba(23,43,40,0.18))]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center text-[#f6f7f2]">
                    <p className="font-display text-[3.25rem] leading-none md:text-[5.6rem]">
                      LUAZ
                    </p>
                    <p className="mt-3 text-[10px] uppercase tracking-normal text-[#f6f7f2]/62">
                      evening ritual system
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemContainerVariants}
                initial="closed"
                animate={itemsOpen ? "open" : "closed"}
                className="absolute left-1/2 top-[53%] h-1 w-1 -translate-x-1/2 -translate-y-1/2"
              >
                {products.map((product, index) => (
                  <FloatingItem
                    key={product.id}
                    index={index}
                    isOpen={itemsOpen}
                    position={floatingPositions[index]}
                    product={product}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ scaleX: lineScale }}
          className="absolute bottom-20 left-1/2 z-10 h-px w-[min(78vw,880px)] origin-center -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(246,247,242,0.42),transparent)] md:bottom-24 md:w-[min(72vw,880px)]"
        />
        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[#f6f7f2]/16 bg-[#f6f7f2]/8 px-4 py-2 text-[11px] uppercase text-[#f6f7f2]/70 backdrop-blur-md"
        >
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
