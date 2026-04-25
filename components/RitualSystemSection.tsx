"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { products } from "@/data/products";

export function RitualSystemSection() {
  const steps = [...products.map((product) => product.shortLabel), "rest"];
  const [activeStep, setActiveStep] = useState(0);
  const activeProduct = products[activeStep] ?? products[products.length - 1];

  return (
    <section id="origin" className="relative overflow-hidden bg-luaz-ink px-5 py-28 md:px-8 md:py-40">
      <img
        src="/assets/back_box_sample_1.png"
        alt="LUAZ ritual box materials"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.1] saturate-[0.72]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#d8e4df,#f6f7f2_48%,#eaf0ec)]" />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="grid gap-12 md:grid-cols-[0.86fr_1.14fr] md:items-start">
          <div className="md:sticky md:top-28">
            <p className="text-[12px] uppercase text-luaz-mineral">Evening architecture</p>
            <h2 className="mt-5 max-w-[620px] font-display text-[4.4rem] leading-[0.9] text-luaz-paper md:text-[7rem]">
              Made for controlled deceleration.
            </h2>
          </div>

          <div className="space-y-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                onMouseEnter={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                tabIndex={0}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-14%" }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative grid cursor-default gap-6 overflow-hidden rounded-[8px] border-t border-luaz-paper/12 px-0 py-8 outline-none transition-colors duration-500 focus-visible:border-luaz-herb md:grid-cols-[110px_1fr] md:px-5"
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
                  <h3 className="font-display text-[3rem] leading-none text-luaz-paper md:text-[4.2rem]">
                    {product.shortLabel}
                  </h3>
                  <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-luaz-mist/64">
                    {product.conceptTitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-28 grid gap-6 overflow-hidden rounded-[8px] border border-luaz-paper/12 bg-luaz-graphite/64 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div className="relative min-h-[340px] overflow-hidden rounded-[8px] border border-luaz-paper/10">
            <motion.img
              key={activeProduct.id}
              src={activeProduct.image}
              alt={`${activeProduct.name} ritual detail`}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.82, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,247,242,0.08),rgba(246,247,242,0.9))]" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-[11px] uppercase" style={{ color: activeProduct.tone }}>
                Current cue
              </p>
              <h3 className="mt-3 font-display text-[3.2rem] leading-none text-luaz-paper md:text-[4.4rem]">
                {activeProduct.shortLabel}
              </h3>
              <p className="mt-5 max-w-[420px] text-[14px] leading-6 text-luaz-mist/68">
                {activeProduct.systemReason}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-6">
            {steps.map((step, index) => (
              <button
                key={step}
                type="button"
                onMouseEnter={() => setActiveStep(Math.min(index, products.length - 1))}
                onFocus={() => setActiveStep(Math.min(index, products.length - 1))}
                className="group/tile relative min-h-[132px] border border-luaz-paper/10 p-4 text-left outline-none transition-colors duration-500 hover:border-luaz-paper/24 focus-visible:border-luaz-herb"
              >
                <motion.span
                  className="absolute inset-x-0 top-0 h-px"
                  animate={{
                    opacity: index === activeStep ? 1 : 0,
                    scaleX: index === activeStep ? 1 : 0.25
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundColor: activeProduct.tone, transformOrigin: "left" }}
                />
                <span className="text-[11px] uppercase text-luaz-mist/42">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="absolute bottom-4 left-4 right-4 font-display text-[2.4rem] leading-none text-luaz-paper transition-transform duration-500 group-hover/tile:-translate-y-1">
                  {step}
                </p>
                {index < steps.length - 1 ? (
                  <span className="absolute right-4 top-4 h-px w-8 bg-luaz-herb/60 md:-right-6 md:top-1/2 md:w-7" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
