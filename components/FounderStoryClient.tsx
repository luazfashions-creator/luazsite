"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const storyParagraphs = [
  "LUAZ was born from a simple observation: the body does not fall into rest by command. It needs a transition.",
  "Before the idea became a box, it was a small evening sequence — warm water for the feet, a quiet scent in the room, a cup of chamomile, soft warmth, and a few minutes away from the noise of the day.",
  "The spark came from understanding that calmness is not created by one object alone. It is created by order, repetition, atmosphere, and a signal the body can recognize.",
  "Rooted in the stillness of the Himalayas and shaped for modern European evenings, LUAZ became a structured ritual for calmness before sleep."
];

const smoothEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: smoothEase }
  }
};

type FounderStoryClientProps = {
  hasImage: boolean;
  imageSrc: string;
};

export function FounderStoryClient({ hasImage, imageSrc }: FounderStoryClientProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const syncHashTarget = () => {
      setForceVisible(window.location.hash === "#founder-story");
    };

    syncHashTarget();
    window.addEventListener("hashchange", syncHashTarget);

    return () => window.removeEventListener("hashchange", syncHashTarget);
  }, []);

  return (
    <section
      id="founder-story"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ebe7df_0%,#f5f3ef_100%)] px-6 py-28 text-luaz-text md:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-luaz-text/10 to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)] lg:gap-20">
        <motion.div
          initial="hidden"
          animate={forceVisible ? "show" : undefined}
          whileInView="show"
          viewport={{ once: true, amount: 0.28 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-[10px] font-medium uppercase tracking-[0.34em] text-luaz-gold-soft"
          >
            THE STORY BEHIND LUAZ
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl font-light leading-[1.05] tracking-normal text-luaz-text md:text-5xl lg:text-6xl"
          >
            It began with a ritual, not a product.
          </motion.h2>

          <div className="mt-9 space-y-5 text-[15px] font-light leading-8 text-luaz-text/80 md:text-[17px] md:leading-9">
            {storyParagraphs.map((paragraph) => (
              <motion.p key={paragraph} variants={fadeUp}>
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.blockquote
            variants={fadeUp}
            className="mt-12 border-l border-luaz-text/20 pl-7 font-serif text-2xl font-light italic leading-snug text-luaz-text md:text-3xl"
          >
            “We did not want to build another wellness product. We wanted to design the moment before sleep.”
          </motion.blockquote>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-luaz-text-muted"
          >
            — The LUAZ Founders
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-xl border-t border-luaz-border pt-7 font-serif text-xl font-light italic leading-relaxed text-luaz-text/80 md:text-2xl"
          >
            A physical ritual for the body. A digital companion for the mind. A calmer night, designed step by step.
          </motion.p>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, x: 42 }}
          animate={forceVisible ? { opacity: 1, x: 0 } : undefined}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.95, ease: smoothEase }}
          className="relative"
        >
          <div className="relative h-[420px] min-h-[420px] overflow-hidden rounded-[28px] border border-[rgba(29,29,31,0.12)] bg-[#e6e2da] shadow-[0_40px_120px_rgba(70,60,45,0.16)] md:h-[620px] md:min-h-[620px]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#e8e5df_0%,#d7d0c4_52%,#bfb7aa_100%)]" />
            <div className="absolute inset-x-[-8%] bottom-0 h-[68%] bg-[#aaa194] opacity-75 [clip-path:polygon(0_80%,18%_48%,32%_60%,46%_28%,63%_56%,78%_36%,100%_70%,100%_100%,0_100%)]" />
            <div className="absolute inset-x-[-10%] bottom-0 h-[54%] bg-[#ded8ce] opacity-90 [clip-path:polygon(0_70%,16%_46%,28%_58%,42%_26%,54%_48%,66%_34%,82%_62%,100%_42%,100%_100%,0_100%)]" />
            <div className="absolute inset-x-0 top-1/4 h-24 bg-white/30 blur-3xl" />

            {hasImage && !imageFailed && (
              <motion.div
                initial={{ scale: 1.04 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1, ease: smoothEase }}
                className="absolute inset-0"
              >
                <Image
                  src={imageSrc}
                  alt="Himalayan landscape representing the origin of LUAZ"
                  fill
                  sizes="(max-width: 768px) 100vw, 46vw"
                  className="object-cover [filter:sepia(0.08)_saturate(0.88)_contrast(1.04)]"
                  onError={() => setImageFailed(true)}
                />
              </motion.div>
            )}

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,29,31,0.06)_0%,transparent_34%,rgba(29,29,31,0.28)_100%)]" />
            <div className="absolute inset-[14px] rounded-[20px] border border-white/25" />

            <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.24em] text-white shadow-sm backdrop-blur-md">
              Origin / Himalaya
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 text-white md:flex-row md:items-end md:justify-between">
              <figcaption className="max-w-[310px] text-[11px] font-medium uppercase leading-relaxed tracking-[0.22em] text-white/80">
                Himalayan stillness — the origin of the LUAZ ritual philosophy.
              </figcaption>
              <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/70">
                Touch → Scent → Taste → Warmth
              </p>
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
