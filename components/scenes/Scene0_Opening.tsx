"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const introTransition = {
  delay: 1,
  duration: 1.4,
  ease: [0.22, 1, 0.36, 1]
};

const positioningLines = ["The last hour,", "lowered into rest."];

export function Scene0_Opening() {
  return (
    <section className="luaz-cinema-bars relative h-[100svh] w-screen overflow-hidden bg-[#dbe5de]">
      <Image
        src="/heroimage.png"
        alt="LUAZ ritual atmosphere"
        fill
        priority
        sizes="100vw"
        className="scale-[1.03] object-cover object-[center_top] opacity-[0.97] brightness-[1.12] contrast-[0.94] saturate-[1.02]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,243,239,0.72)_0%,rgba(238,243,239,0.4)_34%,rgba(22,33,30,0.14)_62%,rgba(22,33,30,0.42)_100%),linear-gradient(180deg,rgba(248,246,242,0.18)_0%,rgba(248,246,242,0.04)_38%,rgba(17,25,22,0.36)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_54%_48%_at_22%_56%,rgba(225,235,227,0.62),transparent_70%),radial-gradient(ellipse_34%_44%_at_74%_28%,rgba(214,201,154,0.24),transparent_72%),linear-gradient(180deg,transparent_62%,rgba(14,20,18,0.24)_100%)]" />
      <div className="luaz-film-grain pointer-events-none absolute inset-0 opacity-30" />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-6 top-10 z-20 font-display text-[12px] font-light uppercase tracking-[0.56em] text-[rgba(27,39,35,0.72)] md:left-12"
        initial={{ opacity: 0, y: 8 }}
        transition={introTransition}
      >
        LUAZ / Evening Ritual System
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-x-6 bottom-24 z-10 md:inset-x-12 md:bottom-24"
        initial={{ opacity: 0, y: 34 }}
        transition={{ ...introTransition, delay: 0.42, duration: 1.8 }}
      >
        <div className="max-w-[840px]">
          <p className="font-display text-[10px] font-light uppercase tracking-[0.52em] text-[rgba(27,39,35,0.56)] md:text-[11px]">
            Warmth / Release / Scent / Touch
          </p>
          <h1 className="mt-5 font-display text-[clamp(3.2rem,8vw,8.5rem)] font-light leading-[0.9] text-[#f7f4ee] drop-shadow-[0_28px_80px_rgba(13,18,16,0.18)] md:max-w-[780px]">
            {positioningLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[620px] font-body text-[17px] leading-7 text-[rgba(28,38,35,0.78)] md:text-[20px] md:leading-8">
            LUAZ composes warmth, mineral release, scent memory, and grounded
            touch into one calm sequence designed for the final hour before
            sleep.
          </p>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scaleX: 1 }}
        className="absolute bottom-[16vh] left-6 right-6 z-10 hidden h-px origin-left bg-[linear-gradient(90deg,rgba(247,244,238,0.88),rgba(247,244,238,0.34),transparent)] md:block md:left-12 md:right-[30vw]"
        initial={{ opacity: 0, scaleX: 0.36 }}
        transition={{ delay: 1.25, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-[15vh] right-6 z-10 hidden w-[260px] text-right md:block md:right-12"
        initial={{ opacity: 0, y: 18 }}
        transition={{ ...introTransition, delay: 0.9, duration: 1.3 }}
      >
        <p className="font-display text-[10px] font-light uppercase tracking-[0.44em] text-[rgba(247,244,238,0.58)]">
          Composed Descent
        </p>
        <p className="mt-4 font-display text-[1.05rem] font-light italic leading-6 text-[rgba(247,244,238,0.86)]">
          A quieter way to arrive at sleep, without forcing the night.
        </p>
      </motion.div>

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-14 left-6 z-20 whitespace-nowrap font-body text-[10px] font-light uppercase tracking-[0.46em] text-[rgba(27,39,35,0.46)] md:left-12"
        initial={{ opacity: 0, y: 8 }}
        transition={introTransition}
      >
        The Last Hour Made Deliberate
      </motion.p>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-14 right-6 z-20 flex flex-col items-center gap-4 text-[rgba(247,244,238,0.42)] md:right-12"
        initial={{ opacity: 0, y: 8 }}
        transition={introTransition}
      >
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          className="h-[30px] w-px origin-top bg-[rgba(247,244,238,0.48)]"
          transition={{
            duration: 2,
            ease: [0.45, 0, 0.55, 1],
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <p className="font-body text-[9px] font-light uppercase tracking-[0.4em]">
          Scroll
        </p>
      </motion.div>
    </section>
  );
}
