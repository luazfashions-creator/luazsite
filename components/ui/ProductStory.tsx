"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { LuazProduct } from "@/lib/products";

type ProductStoryProps = {
  index: number;
  product: LuazProduct;
};

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  return `rgba(${r},${g},${b},${alpha})`;
}

export function ProductStory({ index, product }: ProductStoryProps) {
  const imageLeft = index % 2 === 0;
  const glowPosition = imageLeft ? "100% 50%" : "0% 50%";
  const windowNumber = String(index + 1).padStart(2, "0");

  return (
    <section
      id={`product-${product.id}`}
      className="relative min-h-screen overflow-hidden bg-[#e8f0e9]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 44% 62% at ${glowPosition}, ${hexToRgba(
            product.accentColor,
            0.14
          )} 0%, transparent 68%), radial-gradient(ellipse 62% 38% at 50% 0%, rgba(37,58,50,0.22), transparent 70%), linear-gradient(180deg, rgba(231,240,232,0.96), rgba(246,244,237,0.88) 46%, rgba(216,229,219,0.82))`
        }}
      />
      <div className="luaz-film-grain pointer-events-none absolute inset-0 opacity-[0.16]" />

      <div className="relative mx-auto grid min-h-screen max-w-[1680px] gap-9 px-5 py-10 md:grid-cols-[1.18fr_0.82fr] md:items-center md:px-10 md:py-12 lg:px-14">
        <motion.div
          className={`relative ${imageLeft ? "md:order-1" : "md:order-2"}`}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[0.92/1] min-h-[62vh] overflow-hidden rounded-[8px] border border-[rgba(42,39,36,0.08)] bg-[rgba(248,246,242,0.56)] p-3 shadow-[0_54px_150px_rgba(31,45,39,0.16)] md:min-h-[720px]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.32),transparent_38%,rgba(27,39,35,0.08)_100%)]" />
            <div className="absolute left-6 right-6 top-6 z-20 flex items-center justify-between text-[10px] uppercase tracking-[0.42em] text-[rgba(42,39,36,0.48)]">
              <span>Window {windowNumber}</span>
              <span>{product.cue}</span>
            </div>

            <motion.div
              className="absolute inset-[12px] overflow-hidden rounded-[6px] border border-[rgba(42,39,36,0.1)]"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover brightness-[1.05] saturate-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,242,0.06),rgba(18,27,24,0.42))]" />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 50% 18%, ${hexToRgba(
                    product.accentColor,
                    0.32
                  )} 0%, transparent 54%)`
                }}
              />
              <div className="absolute inset-[18px] border border-[rgba(248,246,242,0.28)]" />
              <div className="absolute left-1/2 top-[18px] bottom-[18px] w-px -translate-x-1/2 bg-[rgba(248,246,242,0.12)]" />
              <div className="absolute left-[18px] right-[18px] top-1/2 h-px -translate-y-1/2 bg-[rgba(248,246,242,0.12)]" />

              <div className="absolute inset-x-6 bottom-6 z-20 flex items-end justify-between gap-6">
                <div>
                  <p className="font-display text-[11px] font-light uppercase tracking-[0.4em] text-[rgba(248,246,242,0.62)]">
                    Origin Object
                  </p>
                  <p className="mt-3 font-display text-[clamp(1.6rem,3vw,3rem)] font-light leading-[0.95] text-luaz-white">
                    {product.name}
                  </p>
                  <p className="mt-2 font-display text-[14px] font-light italic tracking-[0.16em] text-[rgba(248,246,242,0.78)]">
                    {product.subtitle}
                  </p>
                </div>

                {product.video ? (
                  <motion.video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={product.video}
                    className="hidden aspect-[4/5] w-[32%] max-w-[220px] rounded-[6px] border border-[rgba(248,246,242,0.18)] object-cover shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:block"
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          delay: 0.6,
                          duration: 1,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                  />
                ) : null}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div
          className={`relative flex min-h-[70vh] items-center ${
            imageLeft ? "md:order-2" : "md:order-1"
          }`}
        >
          <motion.div
            className="max-w-[520px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
          >
            <motion.p
              className="font-body text-[10px] font-light uppercase tracking-[0.5em] text-[rgba(42,39,36,0.46)]"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                }
              }}
            >
              Window {windowNumber}
            </motion.p>

            <motion.h2
              className="mt-7 font-display text-[clamp(3rem,5.4vw,5.6rem)] font-light leading-[0.92] text-luaz-deep"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.1,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
            >
              {product.name}
            </motion.h2>

            <motion.p
              className="mt-6 font-display text-[1.15rem] font-light uppercase tracking-[0.28em] text-[rgba(42,39,36,0.54)]"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
            >
              {product.cue}
            </motion.p>

            <motion.div
              className="mt-9 h-px bg-[rgba(42,39,36,0.16)]"
              variants={{
                hidden: { width: 0 },
                visible: {
                  width: 72,
                  transition: {
                    delay: 0.35,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
            />

            <motion.p
              className="mt-9 max-w-[460px] font-display text-[1.45rem] font-light italic leading-8 text-[rgba(42,39,36,0.72)] md:text-[1.7rem] md:leading-9"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.45,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
            >
              {product.windowNote}
            </motion.p>

            <motion.p
              className="mt-8 max-w-[420px] font-body text-[15px] leading-7 text-[rgba(42,39,36,0.68)]"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.55,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
            >
              {product.story}
            </motion.p>

            <motion.div
              className="mt-10 grid gap-3 text-[10px] uppercase tracking-[0.38em] text-[rgba(42,39,36,0.42)] sm:grid-cols-3"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.65,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
            >
              <div className="border-t border-[rgba(42,39,36,0.12)] pt-4">
                Origin object
              </div>
              <div className="border-t border-[rgba(42,39,36,0.12)] pt-4">
                Final hour cue
              </div>
              <div className="border-t border-[rgba(42,39,36,0.12)] pt-4">
                Sequence {windowNumber}
              </div>
            </motion.div>

            {product.video ? (
              <motion.video
                autoPlay
                muted
                loop
                playsInline
                src={product.video}
                className="mt-10 w-full max-w-[320px] rounded-[6px] border border-[rgba(42,39,36,0.08)] object-cover shadow-[0_24px_70px_rgba(42,39,36,0.12)] md:hidden"
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.72,
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }
                }}
              />
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
