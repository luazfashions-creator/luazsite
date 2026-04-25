"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { LuazProduct } from "@/lib/products";

type VideoRevealProps = {
  active: boolean;
  product: LuazProduct;
};

export function VideoReveal({ active, product }: VideoRevealProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !product.video) return;

    if (active) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [active, product.video]);

  return (
    <motion.div
      aria-hidden="true"
      animate={{
        filter: active ? "blur(0px)" : "blur(6px)",
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.9
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute left-1/2 top-1/2 z-[-1] h-[300px] w-[220px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px]"
    >
      {product.video ? (
        <video
          ref={videoRef}
          src={product.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : (
        <Image
          src={product.image}
          alt=""
          fill
          sizes="220px"
          className="scale-[1.2] object-cover blur-[2px] saturate-[1.3]"
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(42,39,36,0.16)_62%,rgba(42,39,36,0.34)_100%)]" />
    </motion.div>
  );
}
