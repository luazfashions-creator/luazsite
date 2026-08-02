"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { products } from "@/data/products";

export function RitualSystemSection() {
  const steps = [...products.map((product) => product.shortLabel), "rest"];
  const [activeStep, setActiveStep] = useState(0);
  const activeProduct = products[activeStep] ?? products[products.length - 1];

  return (
    <section id="origin" className="relative overflow-hidden bg-luaz-ink px-4 py-20 sm:px-5 md:px-8 md:py-40">
      <img
        src="/media/box/luaz-box-open.webp"
        alt="LUAZ ritual box materials"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.13] saturate-[0.72]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#d8e4df,#f6f7f2_48%,#eaf0ec)]" />
      <div className="luaz-noise absolute inset-0 opacity-[0.14]" />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="grid gap-10 md:grid-cols-[0.86fr_1.14fr] md:items-start md:gap-12">
          <div className="md:sticky md:top-28">
            <div className="mb-7 h-px w-28 bg-luaz-paper/18 md:w-40" />
            <p className="text-[12px] uppercase text-luaz-mineral">Positioned for one job</p>
            <h2 className="mt-4 max-w-[620px] font-display text-[3.25rem] leading-[0.92] text-luaz-paper sm:text-[3.8rem] md:mt-5 md:text-[7rem]">
              Win the hour before sleep.
            </h2>
            <div className="mt-9 hidden max-w-[420px] border-y border-luaz-paper/10 py-6 text-[12px] uppercase leading-6 text-luaz-paper/54 md:block">
              Not another wellness product. A single ritual position: the last hour.
            </div>
          </div>

          <div className="space-y-2 md:space-y-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                onMouseEnter={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                tabIndex={0}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-14%" }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative grid cursor-pointer gap-3 overflow-hidden rounded-[8px] border-t border-luaz-paper/12 px-0 py-6 outline-none transition-colors duration-500 focus-visible:border-luaz-herb md:grid-cols-[110px_1fr] md:gap-6 md:px-5 md:py-8"
              >
                <motion.div
                  className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  animate={{ opacity: activeStep === index ? 1 : 0 }}
                  transition={{ duration: 0.45 }}
                  style={{
                    background: `linear-gradient(90deg, ${product.tone}24, rgba(246,247,242,0.2), transparent)`
                  }}
                />
                <span className="text-[12px] uppercase text-luaz-mist/48">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="font-display text-[2.35rem] leading-none text-luaz-paper sm:text-[2.8rem] md:text-[4.2rem]">
                      {product.shortLabel}
                    </h3>
                    <span
                      className="mb-1 h-2 w-2 rounded-full opacity-70"
                      style={{ backgroundColor: product.tone }}
                    />
                  </div>
                  <p className="mt-4 max-w-[560px] text-[14px] leading-6 text-luaz-mist/72 md:mt-5 md:text-[15px] md:leading-7 md:text-luaz-mist/64">
                    {product.conceptTitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="luaz-glass-edge mt-16 grid gap-5 overflow-hidden rounded-[8px] border border-luaz-paper/12 bg-luaz-graphite/70 p-4 backdrop-blur-xl md:mt-28 md:grid-cols-[0.9fr_1.1fr] md:gap-6 md:p-8">
          <div className="relative min-h-[430px] overflow-hidden rounded-[8px] border border-luaz-paper/10 md:min-h-[340px]">
            <motion.img
              key={activeProduct.id}
              src={activeProduct.image}
              alt={`${activeProduct.name} ritual detail`}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.82, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover saturate-[0.92]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,247,242,0.04),rgba(246,247,242,0.32)_38%,rgba(246,247,242,0.94))]" />
            <div className="absolute inset-[12px] rounded-[6px] border border-white/42" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-[11px] uppercase" style={{ color: activeProduct.tone }}>
                Last hour cue
              </p>
              <h3 className="mt-3 font-display text-[2.65rem] leading-none text-luaz-paper md:text-[4.4rem]">
                {activeProduct.shortLabel}
              </h3>
              <p className="mt-5 max-w-[420px] text-[14px] leading-6 text-luaz-mist/68">
                {activeProduct.systemReason}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
            {steps.map((step, index) => (
              <button
                key={step}
                type="button"
                onMouseEnter={() => setActiveStep(Math.min(index, products.length - 1))}
                onFocus={() => setActiveStep(Math.min(index, products.length - 1))}
                onClick={() => setActiveStep(Math.min(index, products.length - 1))}
                className="group/tile relative min-h-[112px] overflow-hidden rounded-[8px] border border-luaz-paper/10 bg-white/18 p-3 text-left outline-none transition-colors duration-500 hover:border-luaz-paper/24 focus-visible:border-luaz-herb md:min-h-[132px] md:p-4"
              >
                <motion.span
                  className="absolute inset-0"
                  animate={{ opacity: index === activeStep ? 1 : 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    background: `linear-gradient(135deg, ${activeProduct.tone}18, rgba(246,247,242,0.18))`
                  }}
                />
                <motion.span
                  className="absolute inset-x-0 top-0 h-px"
                  animate={{
                    opacity: index === activeStep ? 1 : 0,
                    scaleX: index === activeStep ? 1 : 0.25
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundColor: activeProduct.tone, transformOrigin: "left" }}
                />
                <span className="relative text-[11px] uppercase text-luaz-mist/42">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="absolute bottom-3 left-3 right-3 font-display text-[1.75rem] leading-none text-luaz-paper transition-transform duration-500 group-hover/tile:-translate-y-1 md:bottom-4 md:left-4 md:right-4 md:text-[2.4rem]">
                  {step}
                </p>
                {index < steps.length - 1 ? (
                  <span className="absolute right-3 top-3 h-px w-6 bg-luaz-herb/60 md:-right-6 md:top-1/2 md:w-7" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
