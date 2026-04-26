"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
import { MouseEvent, useRef } from "react";
import { LuazProduct } from "@/data/products";
import { isVideoSource, pauseHoverVideo, playHoverVideo } from "@/lib/media";

type ProductWindowProps = {
  product: LuazProduct;
  index: number;
  onOpen: (product: LuazProduct) => void;
};

export function ProductWindow({ product, index, onOpen }: ProductWindowProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const hasVideo = isVideoSource(product.video);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 28, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 28, mass: 0.35 });
  const rotateY = useSpring(useTransform(pointerX, [0, 100], [-4.8, 4.8]), {
    stiffness: 90,
    damping: 22,
    mass: 0.4
  });
  const rotateX = useSpring(useTransform(pointerY, [0, 100], [4.2, -4.2]), {
    stiffness: 90,
    damping: 22,
    mass: 0.4
  });
  const imageX = useSpring(useTransform(pointerX, [0, 100], [5, -5]), {
    stiffness: 100,
    damping: 24,
    mass: 0.4
  });
  const imageY = useSpring(useTransform(pointerY, [0, 100], [5, -5]), {
    stiffness: 100,
    damping: 24,
    mass: 0.4
  });
  const glow = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, ${product.tone}40, rgba(246,247,242,0.24) 18%, transparent 44%)`;

  function handlePointerMove(event: MouseEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    pointerX.set(x);
    pointerY.set(y);
  }

  function resetPointer() {
    pointerX.set(50);
    pointerY.set(50);
  }

  function handlePointerEnter() {
    playHoverVideo(videoRef.current);
  }

  function handlePointerLeave() {
    resetPointer();
    pauseHoverVideo(videoRef.current);
  }

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(product)}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.9, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        scale: 1.018,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      className="group relative w-full overflow-hidden rounded-[8px] border border-luaz-paper/12 bg-luaz-graphite text-left shadow-window outline-none transition-colors duration-500 hover:border-luaz-paper/26 focus-visible:border-luaz-herb"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/5]">
        <motion.img
          src={product.image}
          alt={`${product.name} ritual visual`}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.82]"
          style={{ x: imageX, y: imageY }}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        {hasVideo ? (
          <video
            ref={videoRef}
            src={product.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,247,242,0.02),rgba(23,43,40,0.26))]" />
        <div className="absolute left-4 top-4 rounded-[8px] border border-luaz-paper/12 bg-luaz-graphite/72 px-3 py-2 text-[10px] uppercase text-luaz-paper/66 opacity-100 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 md:left-5 md:top-5 md:opacity-0 md:group-hover:opacity-100">
          Open chapter
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ backgroundColor: product.tone }}
        />
      </div>
      <div className="min-h-[150px] px-4 py-5 md:min-h-[170px] md:px-6 md:py-6">
        <div className="flex items-start justify-between gap-4 text-[11px] uppercase text-luaz-mist/52">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span style={{ color: product.tone }}>{product.shortLabel}</span>
        </div>
        <h3 className="mt-6 font-display text-[2.2rem] leading-[0.98] text-luaz-paper md:mt-8 md:text-[3.1rem] md:leading-[0.95]">
          {product.name}
        </h3>
        <p className="mt-4 max-w-[22rem] text-[14px] leading-6 text-luaz-mist/70 md:mt-5 md:text-luaz-mist/62">
          {product.conceptBody}
        </p>
        <div className="mt-6 flex items-center gap-3 text-[11px] uppercase text-luaz-paper/60 md:mt-7 md:text-luaz-paper/56">
          <span className="h-px w-8 transition-all duration-500 group-hover:w-12" style={{ backgroundColor: product.tone }} />
          <span>Explore ritual</span>
        </div>
      </div>
    </motion.button>
  );
}
