"use client";

import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { LuazProduct } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

type Scene1AssemblyProps = {
  products: LuazProduct[];
};

const sceneScrollLength = 320;

const roomPositions = [
  { x: "-35vw", y: "-2vh", rotate: -8 },
  { x: "-18vw", y: "-24vh", rotate: -4 },
  { x: "0vw", y: "-32vh", rotate: 0 },
  { x: "18vw", y: "-23vh", rotate: 5 },
  { x: "35vw", y: "-3vh", rotate: 8 }
];

export function Scene1_Assembly({ products }: Scene1AssemblyProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const lidRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const railLeftRef = useRef<HTMLDivElement | null>(null);
  const railRightRef = useRef<HTMLDivElement | null>(null);
  const originCopyRef = useRef<HTMLDivElement | null>(null);
  const bottomHintRef = useRef<HTMLParagraphElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduceMotion = Boolean(useReducedMotion());
  const [settled, setSettled] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const word = wordRef.current;
    const tagline = taglineRef.current;
    const box = boxRef.current;
    const lid = lidRef.current;
    const body = bodyRef.current;
    const glow = glowRef.current;
    const shadow = shadowRef.current;
    const railLeft = railLeftRef.current;
    const railRight = railRightRef.current;
    const originCopy = originCopyRef.current;
    const bottomHint = bottomHintRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLDivElement[];

    if (
      !section ||
      !word ||
      !tagline ||
      !box ||
      !lid ||
      !body ||
      !glow ||
      !shadow ||
      !railLeft ||
      !railRight ||
      !originCopy ||
      !bottomHint ||
      cards.length !== products.length ||
      labels.length !== products.length
    ) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      gsap.set([word, tagline, box, lid, body, glow, shadow, originCopy, bottomHint], {
        clearProps: "all",
        opacity: 1
      });
      gsap.set([railLeft, railRight], { opacity: 0 });
      gsap.set(cards, { opacity: 1, rotate: 0, scale: 1, x: 0, y: 0 });
      gsap.set(labels, { opacity: 1, y: 0 });
      setSettled(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(word, {
        clipPath: "inset(100% 0% 0% 0%)",
        filter: "blur(18px)",
        fontSize: "24vw",
        letterSpacing: "0.18em",
        opacity: 0,
        rotateX: 16,
        scale: 0.96,
        transformOrigin: "50% 60%",
        willChange: "clip-path, font-size, letter-spacing, transform, opacity, filter",
        y: "42vh"
      });
      gsap.set(tagline, {
        filter: "blur(8px)",
        opacity: 0,
        willChange: "transform, opacity, filter",
        y: 28
      });
      gsap.set([railLeft, railRight], { opacity: 0, willChange: "opacity" });
      gsap.set(box, {
        opacity: 0.08,
        rotateX: 13,
        rotateY: -14,
        scale: 0.68,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
        y: "42vh"
      });
      gsap.set(lid, {
        rotateX: 0,
        rotateZ: 0,
        transformOrigin: "50% 100%",
        willChange: "transform, opacity",
        y: 0
      });
      gsap.set(body, {
        rotateX: 0,
        willChange: "transform",
        y: 0
      });
      gsap.set(glow, {
        opacity: 0,
        scale: 0.5,
        willChange: "transform, opacity"
      });
      gsap.set(shadow, {
        opacity: 0,
        scale: 0.42,
        willChange: "transform, opacity",
        y: 72
      });
      gsap.set(originCopy, {
        filter: "blur(8px)",
        opacity: 0,
        willChange: "transform, opacity, filter",
        y: 18
      });
      gsap.set(bottomHint, {
        opacity: 0,
        willChange: "transform, opacity",
        y: 12
      });
      gsap.set(cards, {
        opacity: 0,
        rotate: 0,
        scale: 0.58,
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
        x: 0,
        y: "26vh"
      });
      gsap.set(labels, {
        opacity: 0,
        willChange: "transform, opacity",
        y: 8
      });

      const animatedNodes = [
        word,
        tagline,
        box,
        lid,
        body,
        glow,
        shadow,
        railLeft,
        railRight,
        originCopy,
        bottomHint,
        ...cards,
        ...labels
      ];

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out"
        },
        scrollTrigger: {
          anticipatePin: 1,
          end: `+=${sceneScrollLength}%`,
          onEnter: () => {
            animatedNodes.forEach((node) => {
              node.style.willChange =
                node === word
                  ? "clip-path, font-size, letter-spacing, transform, opacity, filter"
                  : "transform, opacity, filter";
            });
          },
          onEnterBack: () => {
            animatedNodes.forEach((node) => {
              node.style.willChange =
                node === word
                  ? "clip-path, font-size, letter-spacing, transform, opacity, filter"
                  : "transform, opacity, filter";
            });
          },
          onLeave: () => {
            animatedNodes.forEach((node) => {
              node.style.willChange = "";
            });
          },
          onLeaveBack: () => {
            animatedNodes.forEach((node) => {
              node.style.willChange = "";
            });
          },
          onUpdate: (self) => {
            setSettled(self.progress > 0.72);
          },
          pin: true,
          scrub: 1.45,
          start: "top top",
          trigger: section
        }
      });

      timeline
        .to(
          word,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.26,
            filter: "blur(0px)",
            fontSize: "30vw",
            letterSpacing: "0.04em",
            opacity: 1,
            rotateX: 0,
            scale: 1,
            y: "-4vh"
          },
          0
        )
        .to([railLeft, railRight], { duration: 0.16, opacity: 1 }, 0.06)
        .to(
          tagline,
          {
            duration: 0.16,
            filter: "blur(0px)",
            opacity: 1,
            y: 0
          },
          0.12
        )
        .to(
          box,
          {
            duration: 0.28,
            opacity: 0.34,
            rotateX: 8,
            rotateY: -8,
            scale: 0.78,
            y: "27vh"
          },
          0.08
        )
        .to(
          shadow,
          {
            duration: 0.2,
            opacity: 0.22,
            scale: 0.75,
            y: 34
          },
          0.16
        )
        .to([railLeft, railRight], { duration: 0.16, opacity: 0.16 }, 0.28)
        .to(
          word,
          {
            duration: 0.25,
            fontSize: "12vw",
            letterSpacing: "0.42em",
            opacity: 0.26,
            y: "-33vh"
          },
          0.27
        )
        .to(
          tagline,
          {
            duration: 0.18,
            filter: "blur(7px)",
            opacity: 0,
            y: -22
          },
          0.33
        )
        .to(
          box,
          {
            duration: 0.24,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            scale: 1.08,
            y: "12vh"
          },
          0.32
        )
        .to(
          shadow,
          {
            duration: 0.2,
            opacity: 0.62,
            scale: 1,
            y: 0
          },
          0.34
        )
        .to(
          originCopy,
          {
            duration: 0.2,
            filter: "blur(0px)",
            opacity: 1,
            y: 0
          },
          0.38
        )
        .to(
          lid,
          {
            duration: 0.22,
            opacity: 0.94,
            rotateX: -64,
            rotateZ: -2.4,
            y: -58
          },
          0.48
        )
        .to(
          body,
          {
            duration: 0.18,
            y: 20
          },
          0.5
        )
        .to(
          glow,
          {
            duration: 0.22,
            opacity: 1,
            scale: 1.25
          },
          0.48
        )
        .to(
          word,
          {
            duration: 0.2,
            filter: "blur(10px)",
            opacity: 0.05,
            y: "-40vh"
          },
          0.54
        );

      products.forEach((product, index) => {
        const position = roomPositions[index];
        const start = 0.54 + index * 0.045;
        const card = cards[index];
        const label = labels[index];

        timeline.to(
          card,
          {
            duration: 0.28,
            opacity: 1,
            rotate: position.rotate,
            scale: 1,
            x: position.x,
            y: position.y,
            ease: "power2.out"
          },
          start
        );

        timeline.to(
          label,
          {
            duration: 0.1,
            opacity: 1,
            y: 0
          },
          start + 0.22
        );
      });

      timeline
        .to(
          originCopy,
          {
            duration: 0.16,
            opacity: 0.32,
            y: -8
          },
          0.74
        )
        .to(
          bottomHint,
          {
            duration: 0.18,
            opacity: 1,
            y: 0
          },
          0.76
        );
    }, section);

    return () => ctx.revert();
  }, [products]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#1d3029] md:h-screen"
    >
      <div className="luaz-cinema-bars relative min-h-screen overflow-hidden md:sticky md:top-0 md:h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_56%_at_50%_43%,rgba(255,252,242,0.52)_0%,rgba(159,188,173,0.46)_38%,rgba(28,48,41,0.9)_80%),linear-gradient(145deg,rgba(231,224,199,0.22),rgba(109,143,126,0.28)_42%,rgba(18,31,27,0.92)_100%)]" />
        <div className="absolute left-[14%] top-[14%] h-[40vh] w-[30vw] rounded-full bg-[radial-gradient(circle,rgba(255,250,238,0.38),transparent_72%)] blur-3xl" />
        <div className="absolute left-1/2 top-[-16vh] h-[76vh] w-[42vw] -translate-x-1/2 rotate-[-7deg] bg-[linear-gradient(180deg,rgba(255,252,244,0.38),rgba(248,246,242,0.08)_72%,transparent)] blur-xl" />
        <div className="absolute left-1/2 top-[72%] h-[30vh] w-[76vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,245,218,0.26)_0%,rgba(139,169,153,0.16)_42%,transparent_74%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[26vh] bg-[linear-gradient(180deg,transparent,rgba(12,20,17,0.78))]" />
        <div className="luaz-film-grain pointer-events-none absolute inset-0 opacity-[0.24]" />

        <div
          ref={railLeftRef}
          className="absolute left-8 top-1/2 hidden -translate-y-1/2 md:block"
        >
          <div className="h-[80px] w-px bg-[rgba(248,246,242,0.24)]" />
          <p className="mt-5 [writing-mode:vertical-rl] font-display text-[9px] font-light uppercase tracking-[0.36em] text-[rgba(248,246,242,0.42)]">
            FINAL HOUR
          </p>
        </div>
        <div
          ref={railRightRef}
          className="absolute right-8 top-1/2 hidden -translate-y-1/2 md:block"
        >
          <div className="ml-auto h-[80px] w-px bg-[rgba(248,246,242,0.24)]" />
          <p className="mt-5 [writing-mode:vertical-lr] font-display text-[9px] font-light uppercase tracking-[0.36em] text-[rgba(248,246,242,0.42)]">
            ORIGIN WINDOWS
          </p>
        </div>

        <div className="absolute inset-0 grid place-items-center">
          <h1
            ref={wordRef}
            className="pointer-events-none font-display font-light uppercase leading-none text-luaz-white drop-shadow-[0_32px_86px_rgba(0,0,0,0.34)]"
          >
            LUAZ
          </h1>
          <p
            ref={taglineRef}
            className="pointer-events-none absolute top-[58%] font-display text-[1.1rem] font-light italic tracking-[0.3em] text-[rgba(248,246,242,0.66)]"
          >
            A cinematic descent into rest
          </p>
        </div>

        <div
          ref={originCopyRef}
          className="pointer-events-none absolute bottom-16 left-8 hidden max-w-[250px] md:block"
        >
          <p className="font-display text-[10px] font-light uppercase tracking-[0.46em] text-[rgba(248,246,242,0.48)]">
            Origin Windows
          </p>
          <p className="mt-5 font-display text-[1rem] font-light leading-[1.5] tracking-[0.08em] text-[rgba(248,246,242,0.62)]">
            Five objects, each opening onto a different state of calm.
          </p>
        </div>

        <div
          ref={boxRef}
          className="absolute left-1/2 top-1/2 z-10 h-[446px] w-[356px] -translate-x-1/2 -translate-y-1/2 [perspective:1600px] [transform-style:preserve-3d]"
        >
          <div
            ref={shadowRef}
            className="absolute left-1/2 top-[calc(100%+18px)] h-[86px] w-[410px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.18)_46%,transparent_74%)] blur-2xl"
          />
          <div
            ref={glowRef}
            className="absolute left-1/2 top-[28%] h-[270px] w-[430px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,249,236,0.98)_0%,rgba(214,201,154,0.38)_40%,rgba(153,184,167,0.16)_62%,transparent_78%)] blur-2xl"
          />
          <div className="absolute left-1/2 top-[calc(100%+2px)] h-[8px] w-[246px] -translate-x-1/2 rounded-full bg-[rgba(248,246,242,0.14)] blur-md" />
          <div
            ref={lidRef}
            className="absolute left-1/2 top-[6px] h-[162px] w-[332px] -translate-x-1/2 overflow-hidden rounded-[8px] border border-[rgba(248,246,242,0.18)] bg-luaz-stone shadow-[0_42px_132px_rgba(0,0,0,0.44)]"
          >
            <Image
              src="/back_box_sample_1.png"
              alt=""
              fill
              priority
              sizes="332px"
              className="object-cover opacity-[0.94] saturate-[0.96] brightness-[1.04]"
            />
            <div className="luaz-specular absolute inset-0 opacity-70" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,242,0.32),rgba(42,39,36,0.22))]" />
          </div>
          <div
            ref={bodyRef}
            className="absolute bottom-0 left-1/2 h-[368px] w-[356px] -translate-x-1/2 overflow-hidden rounded-[8px] border border-[rgba(248,246,242,0.16)] bg-luaz-stone shadow-[0_80px_200px_rgba(0,0,0,0.5),0_22px_62px_rgba(0,0,0,0.24)]"
          >
            <Image
              src="/box_sample_front.jpeg"
              alt="LUAZ collection box"
              fill
              priority
              sizes="356px"
              className="object-cover object-center saturate-[0.98] brightness-[1.04]"
            />
            <div className="luaz-specular absolute inset-0 opacity-60" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,transparent_38%,rgba(17,25,22,0.28)_100%)]" />
            <div className="absolute inset-[14px] rounded-[8px] border border-[rgba(248,246,242,0.12)]" />
          </div>
        </div>

        <div className="absolute inset-0 z-20 hidden md:block">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="absolute left-1/2 top-1/2 -ml-[82px] -mt-[118px]"
              style={{ zIndex: hoveredId === product.id ? 80 : 30 + product.id }}
            >
              <motion.div
                animate={settled && !reduceMotion ? { y: [0, -7, 0] } : { y: 0 }}
                transition={{
                  delay: product.id * 0.42,
                  duration: 3.1 + product.id * 0.28,
                  ease: [0.45, 0, 0.55, 1],
                  repeat: settled && !reduceMotion ? Infinity : 0,
                  repeatType: "mirror"
                }}
              >
                <motion.a
                  href={`#product-${product.id}`}
                  aria-label={`Enter ${product.name}`}
                  animate={{
                    filter:
                      hoveredId !== null && hoveredId !== product.id
                        ? "blur(1.5px)"
                        : "blur(0px)",
                    opacity: hoveredId !== null && hoveredId !== product.id ? 0.25 : 1,
                    scale: hoveredId !== null && hoveredId !== product.id ? 0.92 : 1
                  }}
                  className="group relative block h-[236px] w-[164px] overflow-hidden rounded-[8px] border border-[rgba(248,246,242,0.26)] bg-luaz-stone text-luaz-white"
                  onBlur={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(product.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onHoverStart={() => setHoveredId(product.id)}
                  style={{
                    boxShadow:
                      hoveredId === product.id
                        ? "0 62px 150px rgba(25,36,32,0.42), 0 18px 52px rgba(255,248,230,0.16)"
                        : "0 42px 108px rgba(25,36,32,0.32), 0 10px 30px rgba(255,248,230,0.1)"
                  }}
                  transition={{
                    damping: 24,
                    mass: 1,
                    stiffness: 120,
                    type: "spring"
                  }}
                  whileHover={{
                    height: 386,
                    scale: 1.08,
                    width: 308,
                    y: -28
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="308px"
                    className="object-cover brightness-[1.05] saturate-[1.04] transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,25,22,0.02),rgba(17,25,22,0.46))]" />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at 50% 20%, ${product.accentColor}66 0%, transparent 54%)`
                    }}
                  />
                  <div className="absolute inset-[11px] border border-[rgba(248,246,242,0.34)] opacity-45 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-95">
                    <div className="absolute left-1/3 top-0 h-full w-px bg-[rgba(248,246,242,0.2)]" />
                    <div className="absolute left-2/3 top-0 h-full w-px bg-[rgba(248,246,242,0.2)]" />
                    <div className="absolute left-0 top-1/2 h-px w-full bg-[rgba(248,246,242,0.2)]" />
                  </div>
                  <div className="absolute left-4 top-4 translate-y-2 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-display text-[9px] font-light uppercase tracking-[0.38em] text-[rgba(248,246,242,0.66)]">
                      Window 0{product.id}
                    </p>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 translate-y-5 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-display text-[20px] font-light uppercase leading-none tracking-[0.22em] text-luaz-white">
                      {product.name}
                    </p>
                    <p className="mt-3 font-display text-[12px] font-light italic tracking-[0.16em] text-[rgba(248,246,242,0.74)]">
                      {product.cue}
                    </p>
                    <p className="mt-4 line-clamp-3 font-display text-[11px] font-light leading-[1.55] tracking-[0.08em] text-[rgba(248,246,242,0.78)]">
                      {product.windowNote}
                    </p>
                  </div>
                </motion.a>
                <div
                  ref={(node) => {
                    labelRefs.current[index] = node;
                  }}
                  className="absolute left-1/2 top-[calc(100%+18px)] w-[210px] -translate-x-1/2 text-center"
                >
                  <p className="font-display text-[12px] font-light uppercase tracking-[0.3em] text-[rgba(248,246,242,0.52)]">
                    {product.name}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="relative z-20 grid min-h-screen gap-10 px-6 py-24 md:hidden">
          <div className="pt-8 text-center">
            <h1 className="font-display text-[22vw] font-light uppercase leading-none tracking-[0.16em] text-luaz-white">
              LUAZ
            </h1>
            <p className="mt-6 font-display text-[1rem] font-light italic tracking-[0.26em] text-[rgba(248,246,242,0.66)]">
              Instantly calms you down
            </p>
          </div>
          {products.map((product) => (
            <motion.a
              key={product.id}
              href={`#product-${product.id}`}
              className="relative mx-auto block h-[330px] w-[min(82vw,286px)] overflow-hidden rounded-[8px] border border-[rgba(248,246,242,0.18)] bg-luaz-stone text-luaz-white shadow-[0_34px_100px_rgba(28,42,36,0.28)]"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="78vw"
                className="object-cover brightness-[1.05] saturate-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,25,22,0.02),rgba(17,25,22,0.62))]" />
              <div className="absolute inset-4 border border-[rgba(248,246,242,0.32)]" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-display text-[22px] font-light uppercase tracking-[0.2em] text-luaz-white">
                  {product.name}
                </p>
                <p className="mt-3 font-display text-[13px] font-light italic tracking-[0.14em] text-[rgba(248,246,242,0.76)]">
                  {product.subtitle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <p
          ref={bottomHintRef}
          className="absolute bottom-11 left-1/2 z-30 hidden -translate-x-1/2 whitespace-nowrap font-display text-[9px] font-light uppercase tracking-[0.5em] text-[rgba(248,246,242,0.48)] md:block"
        >
          Open each window
        </p>
      </div>
    </section>
  );
}
