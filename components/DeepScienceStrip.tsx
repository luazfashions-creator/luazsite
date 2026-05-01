"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "23%", label: "Increase in REM sleep" },
  { value: "5 min", label: "Time to calm state" },
  { value: "↓ Cortisol", label: "Measured drop after ritual" }
];

export function DeepScienceStrip() {
  return (
    <section id="science" className="luaz-deep-section min-h-screen bg-[var(--dusk)]">
      <div className="luaz-deep-inner relative z-10 flex min-h-[70vh] items-center justify-center">
        <div className="grid w-full gap-12 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-18%" }}
              transition={{ duration: 0.9, delay: index * 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-[clamp(4.8rem,11vw,9rem)] font-light leading-none tracking-[-0.04em] text-[var(--ivory)]">
                {stat.value}
              </p>
              <div className="mx-auto my-7 h-px w-28 origin-left bg-[var(--glow)]" />
              <p className="mx-auto max-w-[12rem] font-mono text-[10px] uppercase leading-6 tracking-[0.28em] text-[var(--lunar)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
