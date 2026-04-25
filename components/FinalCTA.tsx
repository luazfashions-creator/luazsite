"use client";

import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section
      id="invitation"
      className="cinema-vignette relative grid min-h-screen place-items-center overflow-hidden bg-luaz-void px-5 py-28 text-center"
    >
      <img
        src="/assets/heroimage.png"
        alt="Calm evening with LUAZ ritual box"
        className="absolute inset-0 h-full w-full object-cover object-[43%_center] opacity-[0.28] saturate-[0.84]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#eaf0ec,rgba(246,247,242,0.84)_48%,#eaf0ec),linear-gradient(120deg,rgba(197,127,132,0.16),transparent_42%),linear-gradient(245deg,rgba(120,157,132,0.2),transparent_38%)]" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-16%" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-[980px]"
      >
        <p className="text-[12px] uppercase text-luaz-herb">Invitation</p>
        <h2 className="mt-6 font-display text-[4.8rem] leading-[0.86] text-luaz-paper md:text-[8.5rem]">
          Let the day close with intention.
        </h2>
        <p className="mx-auto mt-9 max-w-[560px] text-[16px] leading-8 text-luaz-mist/68">
          LUAZ turns intensity into recovery through a measured sequence of
          warmth, release, scent, atmosphere, and touch.
        </p>
        <motion.a
          href="#top"
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="mt-12 inline-flex rounded-[8px] border border-luaz-paper/18 px-7 py-4 text-[12px] uppercase text-luaz-paper transition-colors duration-500 hover:border-luaz-herb"
        >
          Enter the ritual
        </motion.a>
      </motion.div>
    </section>
  );
}
