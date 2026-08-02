"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { products, LuazProduct } from "@/data/products";

type ProductWindowsSectionProps = {
  onOpenProduct: (product: LuazProduct) => void;
};

const windowPositions = [
  "md:left-0 md:top-[16%] md:w-[26%]",
  "md:left-[10%] md:bottom-[8%] md:w-[24%]",
  "md:left-[38%] md:bottom-0 md:w-[25%]",
  "md:right-0 md:top-[16%] md:w-[26%]",
  "md:right-0 md:bottom-[7%] md:w-[26%]"
];

export function ProductWindowsSection({ onOpenProduct }: ProductWindowsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeProduct = products[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + products.length) % products.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % products.length);
  }

  return (
    <section
      id="objects"
      className="theme-section relative overflow-hidden px-4 py-20 sm:px-5 md:min-h-screen md:px-8 md:py-8"
    >
      <div className="theme-section-bg absolute inset-0" />
      <div className="luaz-noise absolute inset-0 opacity-[0.2]" />
      <div className="pointer-events-none absolute left-[18%] top-0 hidden h-[150%] w-px rotate-45 bg-[#c9a16c]/24 md:block" />

      <div className="relative mx-auto max-w-[1810px]">
        <motion.div
          className="relative z-30 grid gap-8 md:h-20 md:grid-cols-[1fr_1.6fr_1fr] md:items-start"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start gap-6">
            <h2 className="max-w-[13rem] font-display text-[3.25rem] leading-[0.78] md:text-[3.7rem]">
              The DEEP System
            </h2>
            <p className="hidden pt-2 text-[12px] uppercase text-black/40 md:block">
              The ritual before sleep
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <button
              type="button"
              className="rounded-[8px] border border-black/10 bg-black/[0.04] px-8 py-4 text-[12px] uppercase text-black/80 backdrop-blur-xl transition hover:bg-black/[0.08]"
              onMouseEnter={() => setActiveIndex(0)}
              onFocus={() => setActiveIndex(0)}
            >
              DEEP
            </button>
            <button
              type="button"
              className="rounded-[8px] border border-black/10 bg-black/[0.04] px-8 py-4 text-[12px] uppercase text-black/80 backdrop-blur-xl transition hover:bg-black/[0.08]"
              onMouseEnter={() => setActiveIndex(3)}
              onFocus={() => setActiveIndex(3)}
            >
              Five cues
            </button>
          </div>

          <div className="flex justify-start gap-5 md:justify-end">
            <button
              type="button"
              onClick={() => onOpenProduct(activeProduct)}
              className="rounded-[8px] border border-black/10 bg-black/[0.04] px-8 py-4 text-[12px] uppercase text-black/80 backdrop-blur-xl transition hover:bg-black/[0.08]"
            >
              Begin DEEP
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next ritual window"
              className="grid h-[52px] w-[88px] place-items-center rounded-[8px] bg-black text-white transition hover:scale-[1.02]"
            >
              <span className="text-[20px] leading-none">-&gt;</span>
            </button>
          </div>
        </motion.div>

        <div className="relative z-20 mt-14 md:mt-0 md:min-h-[820px]">
          <div className="pointer-events-none absolute left-1/2 top-6 hidden -translate-x-1/2 text-center font-display text-[3.2rem] leading-[0.95] text-black/80 md:block">
            You transition
            <br />
            into DEEP
          </div>

          <motion.button
            type="button"
            onClick={() => onOpenProduct(activeProduct)}
            className="group relative z-20 mx-auto block w-full overflow-hidden rounded-[16px] border border-black/10 bg-white/40 text-left shadow-[0_20px_40px_rgba(0,0,0,0.05)] outline-none backdrop-blur-xl md:absolute md:left-1/2 md:top-[30%] md:w-[49%] md:-translate-x-1/2"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[2.35/1]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProduct.id}
                  src={activeProduct.image}
                  alt={`${activeProduct.name} featured ritual window`}
                  className="absolute inset-0 h-full w-full object-cover saturate-[0.9]"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(255,255,255,0.8))]" />
              <div className="absolute inset-[10px] rounded-[12px] border border-black/5" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase text-black/60 font-medium">
                    {activeProduct.shortLabel} / DEEP cue
                  </p>
                  <h3 className="mt-2 font-display text-[3rem] leading-none text-black md:text-[4rem]">
                    {activeProduct.name}
                  </h3>
                </div>
                <p className="hidden max-w-[260px] text-[14px] leading-6 text-black/70 md:block">
                  {activeProduct.conceptTitle}
                </p>
              </div>
            </div>
          </motion.button>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:mt-0 md:block">
            {products.map((product, index) => (
              <motion.button
                key={product.id}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`group relative overflow-hidden rounded-[12px] border text-left outline-none transition duration-500 shadow-[0_10px_20px_rgba(0,0,0,0.03)] md:absolute ${
                  activeIndex === index
                    ? "border-black/20 opacity-100"
                    : "border-black/5 opacity-75 hover:opacity-100"
                } ${windowPositions[index]}`}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[1.58/1] overflow-hidden md:aspect-[1.65/1]">
                  <img
                    src={product.image}
                    alt={`${product.name} ritual selector`}
                    className="absolute inset-0 h-full w-full object-cover saturate-[0.82] transition duration-700 group-hover:scale-[1.05] group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.8))]" />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1 transition-opacity duration-500"
                    style={{
                      backgroundColor: product.tone,
                      opacity: activeIndex === index ? 1 : 0.28
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase font-medium text-black/50">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 font-display text-[1.65rem] leading-none text-black">
                        {product.shortLabel}
                      </p>
                    </div>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-black/10 bg-white/40 text-[13px] text-black/80 backdrop-blur-md">
                      {activeIndex === index ? "open" : "+"}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="absolute bottom-0 left-1/2 hidden w-[48%] -translate-x-1/2 overflow-hidden rounded-t-[8px] opacity-40 md:block">
            <img
              src="/media/box/luaz-box-open.webp"
              alt=""
              className="h-[220px] w-full object-cover object-bottom saturate-0"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,21,20,0.06),#111514_92%)]" />
          </div>

          <div className="relative z-30 mt-8 flex items-center justify-between text-[11px] uppercase font-medium text-black/50 md:absolute md:bottom-4 md:left-1/2 md:w-[49%] md:-translate-x-1/2">
            <button type="button" onClick={showPrevious} className="transition hover:text-black">
              Previous
            </button>
            <span>The DEEP ritual system</span>
            <button type="button" onClick={showNext} className="transition hover:text-black">
              Next
            </button>
          </div>
        </div>

        <div className="sr-only">
          {products.map((product, index) => (
            <span key={product.id}>{index + 1}. {product.name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
