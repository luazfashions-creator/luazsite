"use client";

import { motion } from "framer-motion";

export function DeepManifestoSection() {
  return (
    <section id="manifesto" className="luaz-deep-section bg-[var(--midnight)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,var(--glow-warm),transparent_46%)]" />
      <motion.div
        className="luaz-copy-column relative z-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-22%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="luaz-label">The LUAZ philosophy</p>
        <h2 className="luaz-display mt-8 italic">
          Sleep does not begin
          <br />
          when your eyes close.
        </h2>
        <div className="mx-auto mt-10 h-px w-24 bg-[var(--glow)]/60" />
        <div className="luaz-body-copy mx-auto mt-10 max-w-[580px] space-y-6">
          <p>
            Most people try to fix sleep after they are already in bed. They
            lie there. They wait. Nothing arrives.
          </p>
          <p>
            LUAZ prepares the body before sleep begins. One box. One sequence.
            One biological descent.
          </p>
        </div>
        <h3 className="luaz-display mt-16 italic">
          You were designed
          <br />
          to go DEEP.
        </h3>
      </motion.div>
    </section>
  );
}
