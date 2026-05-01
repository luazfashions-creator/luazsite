"use client";

import { motion } from "framer-motion";

export function DeepShopCTA() {
  return (
    <section id="invitation" className="luaz-deep-section bg-[var(--midnight)]">
      <motion.div
        className="luaz-copy-column relative z-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="luaz-label">The LUAZ ritual</p>
        <h2 className="luaz-display mt-7">Schlaf Box</h2>
        <p className="luaz-body-copy mt-6">The complete pre-sleep ritual system.</p>
        <p className="mt-10 font-display text-[3.5rem] font-light text-[var(--gold)]">
          EUR 79
        </p>
        <p className="mt-2 text-sm text-[var(--lunar)]">Free delivery / Ships in 2-3 days</p>
        <a href="#top" className="btn-primary mt-10">
          Begin DEEP <span className="arrow">-&gt;</span>
        </a>
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--lunar)]">
          5-minute ritual / measurable calm / repeatable nightly
        </p>
        <p className="mt-5 text-xs text-[var(--mist)]">
          100-night ritual guarantee. Full refund if you do not reach DEEP.
        </p>
      </motion.div>
    </section>
  );
}
