"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { LuazProduct } from "@/data/products";
import { isVideoSource } from "@/lib/media";

type ProductStoryModalProps = {
  product: LuazProduct | null;
  onClose: () => void;
};

export function ProductStoryModal({ product, onClose }: ProductStoryModalProps) {
  const hasVideo = product ? isVideoSource(product.video) : false;

  useEffect(() => {
    if (!product) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, product]);

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="fixed inset-0 z-[80] bg-luaz-void/94 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            type="button"
            aria-label="Close product story"
            onClick={onClose}
            className="fixed right-4 top-4 z-20 rounded-[8px] border border-luaz-paper/14 bg-luaz-graphite/82 px-4 py-3 text-[12px] uppercase text-luaz-paper/76 backdrop-blur-md transition-colors duration-500 hover:border-luaz-paper/28 hover:text-luaz-paper md:absolute md:right-8 md:top-8 md:bg-luaz-graphite/64"
            whileHover={{ y: -2 }}
          >
            Close
          </motion.button>

          <motion.div
            className="modal-scrollbar grid h-full overflow-y-auto md:grid-cols-[1.05fr_0.95fr]"
            initial={{ y: 40, scale: 0.985 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 26, scale: 0.99 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative min-h-[42svh] overflow-hidden md:min-h-screen">
              {hasVideo ? (
                <video
                  src={product.video}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
              ) : (
                <img
                  src={product.video}
                  alt={`${product.name} ritual story`}
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,247,242,0.02),rgba(246,247,242,0.78)),linear-gradient(90deg,rgba(246,247,242,0),#eaf0ec_96%)]" />
              <div
                className="absolute bottom-0 left-0 h-px w-full opacity-70"
                style={{ backgroundColor: product.tone }}
              />
              <div className="absolute bottom-8 left-5 right-5 md:bottom-10 md:left-8">
                <p className="text-[12px] uppercase text-luaz-mist/58">
                  Ritual study
                </p>
              </div>
            </div>

            <div className="flex min-h-0 items-center px-4 py-12 sm:px-5 md:min-h-screen md:px-14 md:py-24 lg:px-20">
              <div className="max-w-[620px]">
                <p className="text-[12px] uppercase" style={{ color: product.tone }}>
                  {product.shortLabel}
                </p>
                <h2 className="mt-5 font-display text-[3.25rem] leading-[0.9] text-luaz-paper sm:text-[3.8rem] md:mt-6 md:text-[6.4rem] md:leading-[0.88]">
                  {product.name}
                </h2>
                <p className="mt-6 text-[18px] leading-7 text-luaz-paper/86 md:mt-8 md:text-[24px] md:leading-9">
                  {product.ritualRole}
                </p>
                <div className="mt-9 grid gap-6 border-t border-luaz-paper/12 pt-8 text-[15px] leading-7 text-luaz-mist/72 md:mt-12 md:grid-cols-2 md:gap-8 md:pt-10 md:text-luaz-mist/68">
                  <p>{product.description}</p>
                  <p>{product.systemReason}</p>
                </div>
                <div className="mt-10 grid gap-3 text-[12px] uppercase text-luaz-mist/56 sm:grid-cols-3">
                  <div className="border-t border-luaz-paper/12 pt-4">
                    <p style={{ color: product.tone }}>Before</p>
                    <p className="mt-3 text-luaz-paper/68">velocity</p>
                  </div>
                  <div className="border-t border-luaz-paper/12 pt-4">
                    <p style={{ color: product.tone }}>During</p>
                    <p className="mt-3 text-luaz-paper/68">{product.shortLabel}</p>
                  </div>
                  <div className="border-t border-luaz-paper/12 pt-4">
                    <p style={{ color: product.tone }}>After</p>
                    <p className="mt-3 text-luaz-paper/68">readiness</p>
                  </div>
                </div>
                <div className="mt-12 rounded-[8px] border border-luaz-paper/12 bg-luaz-graphite/54 p-5">
                  <p className="text-[11px] uppercase text-luaz-mist/48">material note</p>
                  <p className="mt-3 text-[15px] text-luaz-paper/78">{product.note}</p>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-10 rounded-[8px] border border-luaz-paper/18 px-6 py-4 text-[12px] uppercase text-luaz-paper transition-colors duration-500 hover:border-luaz-herb"
                >
                  {product.ctaLabel}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
