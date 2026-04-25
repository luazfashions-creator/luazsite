"use client";

import { motion } from "framer-motion";
import { ProductStory } from "@/components/ui/ProductStory";
import type { LuazProduct } from "@/lib/products";

type Scene4StoriesProps = {
  products: LuazProduct[];
};

export function Scene4_Stories({ products }: Scene4StoriesProps) {
  return (
    <>
      <section className="bg-luaz-white">
        {products.map((product, index) => (
          <ProductStory key={product.id} index={index} product={product} />
        ))}
      </section>
      <ClosingScene products={products} />
    </>
  );
}

function ClosingScene({ products }: Scene4StoriesProps) {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-[#22332c] px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_66%_50%_at_50%_34%,rgba(247,244,238,0.22),transparent_58%),linear-gradient(135deg,rgba(214,201,154,0.16),rgba(126,159,143,0.22)_48%,rgba(34,51,44,0.88)_100%)]" />
      <div className="absolute left-1/2 top-[16%] h-[44vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,248,226,0.16),transparent_72%)] blur-3xl" />
      <div className="luaz-film-grain pointer-events-none absolute inset-0 opacity-20" />
      <motion.div
        className="relative z-10 max-w-[980px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.16 } }
        }}
      >
        <motion.p
          className="font-display text-[10px] font-light uppercase tracking-[0.46em] text-[rgba(248,246,242,0.48)]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
            }
          }}
        >
          Final Invitation
        </motion.p>
        <motion.h2
          className="mt-6 font-display text-[clamp(3.5rem,10vw,9rem)] font-light leading-[0.84] text-luaz-white opacity-90"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 0.9,
              y: 0,
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
            }
          }}
        >
          Let the room
          <span className="block">finish the ritual.</span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-8 max-w-[620px] font-display text-[1.15rem] font-light italic leading-7 text-[rgba(248,246,242,0.68)] md:text-[1.4rem] md:leading-8"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
            }
          }}
        >
          LUAZ turns ordinary objects into a measured descent, so calm arrives
          as atmosphere, texture, warmth, and memory rather than instruction.
        </motion.p>
        <motion.div
          className="mx-auto mt-10 flex max-w-[860px] flex-wrap justify-center gap-3"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
            }
          }}
        >
          {products.map((product) => (
            <span
              key={product.id}
              className="rounded-[8px] border border-[rgba(248,246,242,0.16)] bg-[rgba(248,246,242,0.06)] px-4 py-3 font-display text-[10px] font-light uppercase tracking-[0.32em] text-[rgba(248,246,242,0.7)] backdrop-blur-sm"
            >
              {product.name}
            </span>
          ))}
        </motion.div>
        <motion.a
          href="#top"
          className="mt-12 inline-flex rounded-[8px] border border-[rgba(248,246,242,0.24)] bg-[rgba(248,246,242,0.04)] px-10 py-[0.95rem] font-body text-[10px] font-light uppercase tracking-[0.48em] text-[rgba(248,246,242,0.78)] backdrop-blur-sm transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(248,246,242,0.6)] hover:bg-[rgba(248,246,242,0.08)] hover:text-[rgba(248,246,242,1)]"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
            }
          }}
        >
          Return to the ritual
        </motion.a>
      </motion.div>
    </section>
  );
}
