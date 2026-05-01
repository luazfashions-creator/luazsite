"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    quote: "I did not fall asleep. I disappeared.",
    author: "Lena M. / verified / Berlin"
  },
  {
    quote: "My body knew what to do. I just followed the ritual.",
    author: "Tomas R. / verified / Lisbon"
  },
  {
    quote: "This is the only sleep system that felt designed for a body.",
    author: "Yuki A. / verified / Tokyo"
  },
  {
    quote: "My recovery hit 98 on night three.",
    author: "Daniel F. / verified / New York"
  },
  {
    quote: "I stopped dreaming I was tired.",
    author: "Sarah K. / verified / Amsterdam"
  }
];

export function DeepTestimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  function move(direction: number) {
    setActive((current) => (current + direction + testimonials.length) % testimonials.length);
  }

  return (
    <section className="luaz-deep-section flex min-h-screen items-center bg-[var(--deep)]">
      <div className="luaz-copy-column">
        <div className="mx-auto mb-12 h-[60px] w-1 bg-[var(--glow)]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial.quote}
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-[clamp(2.4rem,5vw,5rem)] italic leading-[1.15] text-[var(--ivory)]">
              {testimonial.quote}
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lunar)]">
              {testimonial.author}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-12 flex items-center justify-center gap-8">
          <button type="button" onClick={() => move(-1)} className="text-[var(--lunar)]">
            &lt;-
          </button>
          <div className="flex gap-3">
            {testimonials.map((item, index) => (
              <button
                key={item.author}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => setActive(index)}
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: index === active ? "var(--glow)" : "var(--mist)" }}
              />
            ))}
          </div>
          <button type="button" onClick={() => move(1)} className="text-[var(--lunar)]">
            -&gt;
          </button>
        </div>
      </div>
    </section>
  );
}
