"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef } from "react";
import { products } from "@/data/products";
import { RitualBox } from "./RitualBox";

gsap.registerPlugin(ScrollTrigger);

const desktopPositions = [
  { x: -380, y: -185, scale: 1.04, rotation: -5 },
  { x: -355, y: 210, scale: 0.98, rotation: 4 },
  { x: 360, y: -190, scale: 1.02, rotation: 5 },
  { x: 430, y: 36, scale: 1.08, rotation: -2 },
  { x: 350, y: 235, scale: 0.98, rotation: 4 }
];

const tabletPositions = [
  { x: -260, y: -176, scale: 0.92, rotation: -4 },
  { x: -240, y: 172, scale: 0.88, rotation: 4 },
  { x: 248, y: -170, scale: 0.9, rotation: 5 },
  { x: 280, y: 42, scale: 0.94, rotation: -2 },
  { x: 232, y: 184, scale: 0.86, rotation: 3 }
];

const mobilePositions = [
  { x: -74, y: -230, scale: 0.62, rotation: -4 },
  { x: -88, y: 215, scale: 0.58, rotation: 4 },
  { x: 82, y: -226, scale: 0.6, rotation: 5 },
  { x: 96, y: -18, scale: 0.62, rotation: -2 },
  { x: 86, y: 206, scale: 0.58, rotation: 3 }
];

export function TransformationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const productRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lines = useMemo(() => ["slow down", "release", "signal", "atmosphere", "warmth"], []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1180px)", () => buildTimeline(desktopPositions, 0.43));
      mm.add("(min-width: 768px) and (max-width: 1179px)", () => buildTimeline(tabletPositions, 0.46));
      mm.add("(max-width: 767px)", () => buildTimeline(mobilePositions, 0.56));

      function buildTimeline(
        positions: typeof desktopPositions,
        finalBoxScale: number
      ) {
        gsap.set([backgroundRef.current, fieldRef.current, boxRef.current, titleRef.current], {
          willChange: "transform, opacity"
        });

        gsap.set(productRefs.current, {
          x: 0,
          y: 0,
          autoAlpha: 0,
          scale: 0.14,
          rotation: 0,
          clipPath: "inset(18% 18% round 8px)",
          transformOrigin: "50% 50%",
          willChange: "transform, opacity, clip-path"
        });

        gsap.set(boxRef.current, {
          scale: 1.18,
          rotateY: 0,
          autoAlpha: 1
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=3200",
            pin: true,
            scrub: 1.75,
            anticipatePin: 1
          }
        });

        timeline
          .fromTo(
            backgroundRef.current,
            { scale: 1.02, y: 0, autoAlpha: 0.08 },
            { scale: 1.12, y: -48, autoAlpha: 0.14, duration: 1, ease: "none" },
            0
          )
          .fromTo(
            fieldRef.current,
            { scaleX: 0.42, autoAlpha: 0 },
            { scaleX: 1, autoAlpha: 1, duration: 0.42, ease: "power2.out" },
            0.1
          )
          .fromTo(
            titleRef.current,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" },
            0
          )
          .to(titleRef.current, { autoAlpha: 0.22, y: -44, duration: 0.3, ease: "none" }, 0.25)
          .to(
            boxRef.current,
            {
              scale: finalBoxScale,
              y: -14,
              rotateY: -8,
              duration: 0.86,
              ease: "power3.inOut"
            },
            0.08
          );

        productRefs.current.forEach((product, index) => {
          const pos = positions[index];
          timeline.to(
            product,
            {
              autoAlpha: 1,
              x: pos.x,
              y: pos.y,
              scale: pos.scale,
              rotation: pos.rotation,
              clipPath: "inset(0% 0% round 8px)",
              duration: 0.86,
              ease: "power3.inOut"
            },
            0.2 + index * 0.04
          );
        });

        timeline
          .to(productRefs.current, { y: "+=8", duration: 0.28, ease: "sine.inOut" }, 0.88)
          .to(boxRef.current, { autoAlpha: 0.7, duration: 0.22, ease: "none" }, 0.9)
          .to(fieldRef.current, { autoAlpha: 0.28, duration: 0.18, ease: "none" }, 0.9);

        return () => timeline.kill();
      }

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sequence"
      ref={sectionRef}
      className="relative h-screen min-h-[780px] overflow-hidden bg-luaz-void"
    >
      <img
        ref={backgroundRef}
        src="/media/hero/luaz-hero-poster.webp"
        alt="Evening ritual atmosphere"
        className="absolute inset-0 h-full w-full transform-gpu object-cover object-[43%_center] opacity-[0.12] saturate-[0.78]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f6f7f2,#d8e4df_50%,#eaf0ec)]" />
      <div className="relative z-10 flex h-full items-center justify-center px-5">
        <div ref={titleRef} className="absolute top-[12vh] max-w-[760px] text-center">
          <p className="text-[12px] uppercase text-luaz-mineral">Objects emerge</p>
          <h2 className="mt-5 font-display text-[4.6rem] leading-[0.92] text-luaz-paper md:text-[7rem]">
            The case becomes a sequence.
          </h2>
        </div>

        <div className="stage-perspective relative grid h-[620px] w-full max-w-[1180px] place-items-center md:h-[690px]">
          <div
            ref={fieldRef}
            className="absolute left-1/2 top-1/2 h-px w-[min(84vw,980px)] origin-center -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(23,43,40,0.14),rgba(120,157,132,0.24),rgba(197,127,132,0.18),transparent)] opacity-0"
          />
          <div ref={boxRef} className="z-20 w-[260px] transform-gpu md:w-[340px]">
            <RitualBox />
          </div>

          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(node) => {
                productRefs.current[index] = node;
              }}
              className="product-shadow absolute left-1/2 top-1/2 z-30 w-[170px] -translate-x-1/2 -translate-y-1/2 transform-gpu md:w-[220px]"
            >
              <div
                className="overflow-hidden rounded-[8px] border border-luaz-paper/12 bg-luaz-graphite"
                style={{ boxShadow: `0 0 70px ${product.tone}18` }}
              >
                <div className="relative aspect-[4/5]">
                  <img
                    src={product.image}
                    alt={`${product.name} ritual object`}
                    className="h-full w-full object-cover opacity-[0.86]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,247,242,0.04),rgba(23,43,40,0.3))]" />
                </div>
                <div className="flex items-center justify-between px-3 py-3 text-[11px] uppercase text-luaz-paper">
                  <span>{product.name}</span>
                  <span style={{ color: product.tone }}>{lines[index]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
