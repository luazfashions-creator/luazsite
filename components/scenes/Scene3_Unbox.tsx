"use client";

import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { LuazProduct } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

type Scene3UnboxProps = {
  products: LuazProduct[];
};

export function Scene3_Unbox({ products }: Scene3UnboxProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const bottomRef = useRef<HTMLParagraphElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const [settled, setSettled] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLParagraphElement[];
    const bottom = bottomRef.current;
    if (!section || cards.length === 0 || labels.length === 0 || !bottom) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      gsap.set(cards, { opacity: 1, rotate: 0, scale: 1, x: 0, y: 0 });
      gsap.set(labels, { opacity: 1, y: 0 });
      gsap.set(bottom, { opacity: 1, y: 0 });
      setSettled(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        opacity: 0,
        rotate: 0,
        scale: 0.7,
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
        x: 0,
        y: "40vh"
      });
      gsap.set(labels, { opacity: 0, y: 4, willChange: "opacity, transform" });
      gsap.set(bottom, { opacity: 0, y: 10, willChange: "opacity, transform" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          anticipatePin: 1,
          end: "+=400%",
          onEnter: () => {
            cards.forEach((card) => {
              card.style.willChange = "transform, opacity";
            });
            labels.forEach((label) => {
              label.style.willChange = "opacity, transform";
            });
            bottom.style.willChange = "opacity, transform";
          },
          onEnterBack: () => {
            cards.forEach((card) => {
              card.style.willChange = "transform, opacity";
            });
            labels.forEach((label) => {
              label.style.willChange = "opacity, transform";
            });
            bottom.style.willChange = "opacity, transform";
          },
          onLeave: () => {
            [...cards, ...labels, bottom].forEach((node) => {
              node.style.willChange = "";
            });
          },
          onLeaveBack: () => {
            [...cards, ...labels, bottom].forEach((node) => {
              node.style.willChange = "";
            });
          },
          onUpdate: (self) => {
            setSettled(self.progress > 0.8);
          },
          pin: true,
          scrub: 1,
          start: "top top",
          trigger: section
        }
      });

      products.forEach((product, index) => {
        const start = product.staggerStart;
        const card = cards[index];
        const label = labels[index];

        timeline.to(
          card,
          {
            duration: 0.3,
            opacity: 1,
            rotate: product.finalRotate,
            scale: 1,
            x: product.finalX,
            y: product.finalY,
            ease: "power2.out"
          },
          start
        );

        timeline.to(
          label,
          {
            duration: 0.08,
            opacity: 1,
            y: 0
          },
          start + 0.3
        );
      });

      timeline.to(
        bottom,
        {
          duration: 0.16,
          opacity: 1,
          y: 0
        },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, [products]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-luaz-white md:h-[400vh]"
    >
      <div className="relative grid min-h-screen place-items-center overflow-hidden md:sticky md:top-0 md:h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(232,227,220,0.4)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute left-8 top-10 hidden font-display text-[10px] font-light uppercase tracking-[0.5em] text-luaz-grey md:block">
          A house of ritual
        </div>
        <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-lr] font-display text-[10px] font-light uppercase tracking-[0.42em] text-luaz-mist md:block">
          Five rooms in quiet orbit
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[calc(50%+20vh)] z-0 hidden h-[260px] w-[430px] -translate-x-1/2 md:block">
          <div className="absolute left-1/2 top-[78%] h-[58px] w-[360px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(42,39,36,0.13)_0%,rgba(42,39,36,0.05)_42%,transparent_74%)] blur-xl" />
          <div className="absolute left-1/2 top-[12%] h-[150px] w-[260px] -translate-x-1/2 overflow-hidden rounded-[6px] border border-[rgba(42,39,36,0.06)] bg-luaz-stone shadow-[0_24px_64px_rgba(42,39,36,0.12)] [transform-origin:50%_100%] [transform-style:preserve-3d] [transform:rotateX(-58deg)]">
            <Image
              src="/back_box_sample_1.png"
              alt=""
              fill
              sizes="260px"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,242,0.72),rgba(232,227,220,0.16))]" />
          </div>
          <div className="absolute bottom-0 left-1/2 h-[150px] w-[300px] -translate-x-1/2 overflow-hidden rounded-[6px] border border-[rgba(42,39,36,0.06)] bg-luaz-stone shadow-[0_34px_90px_rgba(42,39,36,0.14)]">
            <Image
              src="/box_sample_front.jpeg"
              alt=""
              fill
              sizes="300px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,242,0.08),rgba(42,39,36,0.14))]" />
            <div className="absolute inset-x-10 top-0 h-[72px] bg-[radial-gradient(ellipse_at_center,rgba(253,250,246,0.78)_0%,transparent_72%)] blur-xl" />
          </div>
        </div>

        <div className="relative hidden h-screen w-screen md:block">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="absolute left-1/2 top-1/2 -ml-[55px] -mt-[80px]"
              style={{
                zIndex: hoveredId === product.id ? 50 : 10 + product.id
              }}
            >
              <motion.div
                animate={settled && !reduceMotion ? { y: [0, -8, 0] } : { y: 0 }}
                transition={{
                  delay: product.id * 0.6,
                  duration: 3.0 + product.id * 0.4,
                  ease: [0.45, 0, 0.55, 1],
                  repeat: settled && !reduceMotion ? Infinity : 0,
                  repeatType: "mirror"
                }}
              >
                <motion.a
                  href={`#product-${product.id}`}
                  aria-label={`Enter ${product.name}`}
                  animate={{
                    boxShadow:
                      hoveredId === product.id
                        ? "0 42px 110px rgba(42,39,36,0.22), 0 12px 36px rgba(42,39,36,0.1)"
                        : hoveredId === null
                          ? "0 24px 64px rgba(42,39,36,0.14), 0 6px 20px rgba(42,39,36,0.07)"
                          : "0 14px 38px rgba(42,39,36,0.08)",
                    filter:
                      hoveredId !== null && hoveredId !== product.id
                        ? "blur(1px)"
                        : "blur(0px)",
                    opacity: hoveredId !== null && hoveredId !== product.id ? 0.32 : 1,
                    scale: hoveredId !== null && hoveredId !== product.id ? 0.94 : 1
                  }}
                  className="group relative block h-[160px] w-[110px] overflow-hidden rounded-[6px] bg-luaz-stone text-luaz-white"
                  onBlur={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(product.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onHoverStart={() => setHoveredId(product.id)}
                  transition={{
                    damping: 24,
                    mass: 1,
                    stiffness: 120,
                    type: "spring"
                  }}
                  whileHover={{
                    height: 286,
                    scale: 1.04,
                    width: 222,
                    y: -24
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="222px"
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,39,36,0.02),rgba(42,39,36,0.44))]" />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at 50% 20%, ${product.accentColor}55 0%, transparent 52%)`
                    }}
                  />
                  <div className="absolute inset-[10px] border border-[rgba(248,246,242,0.34)] opacity-45 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-90">
                    <div className="absolute left-1/3 top-0 h-full w-px bg-[rgba(248,246,242,0.22)]" />
                    <div className="absolute left-2/3 top-0 h-full w-px bg-[rgba(248,246,242,0.22)]" />
                    <div className="absolute left-0 top-1/2 h-px w-full bg-[rgba(248,246,242,0.22)]" />
                  </div>
                  <div className="absolute left-4 top-4 translate-y-2 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-display text-[9px] font-light uppercase tracking-[0.38em] text-[rgba(248,246,242,0.64)]">
                      Room 0{product.id}
                    </p>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-display text-[18px] font-light uppercase leading-none tracking-[0.22em] text-luaz-white">
                      {product.name}
                    </p>
                    <p className="mt-3 font-display text-[12px] font-light italic tracking-[0.16em] text-[rgba(248,246,242,0.72)]">
                      {product.subtitle}
                    </p>
                    <p className="mt-4 line-clamp-3 font-display text-[11px] font-light leading-[1.55] tracking-[0.08em] text-[rgba(248,246,242,0.76)]">
                      {product.story}
                    </p>
                  </div>
                </motion.a>
                <p
                  ref={(node) => {
                    labelRefs.current[index] = node;
                  }}
                  className="absolute left-1/2 top-[calc(100%+18px)] w-[180px] -translate-x-1/2 text-center font-display text-[12px] font-light uppercase tracking-[0.3em] text-luaz-grey transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity:
                      hoveredId !== null && hoveredId !== product.id ? 0.25 : undefined
                  }}
                >
                  {product.name}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="relative grid w-full gap-10 px-6 py-24 md:hidden">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-[160px] w-[110px] overflow-hidden rounded-[6px] shadow-soft">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="110px"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 font-display text-[12px] font-light uppercase tracking-[0.3em] text-luaz-grey">
                {product.name}
              </p>
            </motion.div>
          ))}
        </div>

        <p
          ref={bottomRef}
          className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-body text-[9px] font-light uppercase tracking-[0.5em] text-luaz-mist opacity-0 md:block"
        >
          Discover each object
        </p>
      </div>
    </section>
  );
}
