"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { LuazProduct } from "@/lib/products";
import { VideoReveal } from "./VideoReveal";

type ProductCardProps = {
  active: boolean;
  dimmed: boolean;
  onHoverEnd: () => void;
  onHoverStart: () => void;
  product: LuazProduct;
};

export function ProductCard({
  active,
  dimmed,
  onHoverEnd,
  onHoverStart,
  product
}: ProductCardProps) {
  return (
    <motion.div
      animate={{
        opacity: dimmed ? 0.3 : 1,
        scale: active ? 1.18 : dimmed ? 0.94 : 1,
        zIndex: active ? 50 : 10
      }}
      className="relative h-[140px] w-[100px]"
      onHoverEnd={onHoverEnd}
      onHoverStart={onHoverStart}
      transition={{ type: "spring", stiffness: 130, damping: 24, mass: 0.85 }}
    >
      <VideoReveal active={active} product={product} />
      <motion.div
        animate={{
          boxShadow: active
            ? "0 40px 100px rgba(42,39,36,0.22)"
            : "0 20px 60px rgba(42,39,36,0.12), 0 4px 16px rgba(42,39,36,0.06)"
        }}
        className="relative h-full w-full overflow-hidden rounded-[8px]"
        transition={{ type: "spring", stiffness: 130, damping: 24 }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="100px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,242,0.04),rgba(42,39,36,0.18))]" />
      </motion.div>

      <AnimatePresence>
        {active ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 top-[calc(100%+18px)] w-[160px] -translate-x-1/2 text-center"
            exit={{ opacity: 0, y: 8 }}
            initial={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-heading text-[16px] font-light uppercase leading-relaxed tracking-[0.2em] text-luaz-deep">
              {product.name}
            </p>
            <p className="mt-3 font-body text-[11px] font-light leading-loose tracking-[0.15em] text-luaz-warm-grey">
              {product.story}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
