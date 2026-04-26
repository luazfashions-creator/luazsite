"use client";

import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section
      id="invitation"
      className="cinema-vignette relative grid min-h-[88svh] place-items-center overflow-hidden bg-luaz-void px-4 py-20 text-center sm:px-5 md:min-h-screen md:py-28"
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
        <h2 className="mt-5 font-display text-[3.45rem] leading-[0.9] text-luaz-paper sm:text-[4.2rem] md:mt-6 md:text-[8.5rem] md:leading-[0.86]">
          Let the day close with intention.
        </h2>
        <p className="mx-auto mt-7 max-w-[560px] text-[15px] leading-7 text-luaz-mist/72 md:mt-9 md:text-[16px] md:leading-8 md:text-luaz-mist/68">
          LUAZ turns intensity into recovery through a measured sequence of
          warmth, release, scent, atmosphere, and touch.
        </p>
        <motion.a
          href="#top"
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 inline-flex rounded-[8px] border border-luaz-paper/18 px-6 py-4 text-[12px] uppercase text-luaz-paper transition-colors duration-500 hover:border-luaz-herb md:mt-12 md:px-7"
        >
          Enter the ritual
        </motion.a>
      </motion.div>
    </section>
  );
}
