"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { products } from "@/data/products";
import { isVideoSource, pauseHoverVideo, playHoverVideo } from "@/lib/media";
import { RitualBox } from "./RitualBox";

gsap.registerPlugin(ScrollTrigger);

type ProductPosition = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

const desktopPositions: ProductPosition[] = [
  { x: -420, y: -192, scale: 1.05, rotation: -5 },
  { x: -392, y: 206, scale: 0.98, rotation: 4 },
  { x: 388, y: -204, scale: 1.02, rotation: 5 },
  { x: 462, y: 28, scale: 1.08, rotation: -2 },
  { x: 366, y: 238, scale: 0.98, rotation: 4 }
];

const tabletPositions: ProductPosition[] = [
  { x: -286, y: -184, scale: 0.94, rotation: -4 },
  { x: -266, y: 178, scale: 0.88, rotation: 4 },
  { x: 268, y: -178, scale: 0.92, rotation: 5 },
  { x: 304, y: 42, scale: 0.96, rotation: -2 },
  { x: 252, y: 198, scale: 0.86, rotation: 3 }
];

const mobilePositions: ProductPosition[] = [
  { x: -86, y: -244, scale: 0.66, rotation: -4 },
  { x: -100, y: 214, scale: 0.6, rotation: 4 },
  { x: 94, y: -230, scale: 0.62, rotation: 5 },
  { x: 108, y: -16, scale: 0.64, rotation: -2 },
  { x: 96, y: 208, scale: 0.58, rotation: 3 }
];

export function BoxRevealSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ambientRef = useRef<HTMLImageElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const boxRigRef = useRef<HTMLDivElement | null>(null);
  const lidRef = useRef<HTMLDivElement | null>(null);
  const innerGlowRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const productRefs = useRef<Array<HTMLDivElement | null>>([]);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  function handleProductEnter(index: number) {
    playHoverVideo(videoRefs.current[index]);
  }

  function handleProductLeave(index: number) {
    pauseHoverVideo(videoRefs.current[index]);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1180px)", () => buildTimeline(desktopPositions, 0.48, -10));
      mm.add("(min-width: 768px) and (max-width: 1179px)", () =>
        buildTimeline(tabletPositions, 0.54, -6)
      );
      mm.add("(max-width: 767px)", () => buildTimeline(mobilePositions, 0.62, 0));

      function buildTimeline(
        positions: ProductPosition[],
        finalBoxScale: number,
        finalBoxY: number
      ) {
        const productCards = productRefs.current.filter(Boolean) as HTMLDivElement[];
        const markers = markerRefs.current.filter(Boolean) as HTMLSpanElement[];

        gsap.set(
          [
            ambientRef.current,
            brandRef.current,
            stageRef.current,
            boxRigRef.current,
            lidRef.current,
            innerGlowRef.current,
            auraRef.current,
            fieldRef.current,
            lineRef.current
          ],
          {
            willChange: "transform, opacity"
          }
        );

        gsap.set(brandRef.current, {
          autoAlpha: 0,
          filter: "blur(10px)",
          x: -42,
          y: 22
        });
        gsap.set(stageRef.current, {
          autoAlpha: 0,
          scale: 0.96
        });
        gsap.set(boxRigRef.current, {
          autoAlpha: 0,
          rotateX: 9,
          rotateY: -7,
          scale: 0.74,
          transformOrigin: "50% 50%",
          y: 86
        });
        gsap.set(lidRef.current, {
          rotateX: 0,
          rotateY: 0,
          transformOrigin: "50% 8%",
          y: 0,
          z: 0
        });
        gsap.set([innerGlowRef.current, auraRef.current], {
          autoAlpha: 0,
          scale: 0.72
        });
        gsap.set(fieldRef.current, {
          autoAlpha: 0,
          scaleX: 0.18,
          transformOrigin: "50% 50%"
        });
        gsap.set(lineRef.current, {
          autoAlpha: 0,
          scaleX: 0,
          transformOrigin: "0% 50%"
        });
        gsap.set(markers, {
          autoAlpha: 0.28,
          scale: 1,
          transformOrigin: "50% 50%"
        });
        gsap.set(productCards, {
          autoAlpha: 0,
          clipPath: "inset(42% 42% round 8px)",
          rotation: 0,
          scale: 0.12,
          transformOrigin: "50% 50%",
          willChange: "transform, opacity, clip-path",
          x: 0,
          y: 0
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=4300",
            scrub: 1.55,
            pin: true,
            anticipatePin: 1
          }
        });

        timeline
          .fromTo(
            ambientRef.current,
            { autoAlpha: 0.08, scale: 1.04, y: 34 },
            { autoAlpha: 0.18, scale: 1.13, y: -46, duration: 1, ease: "none" },
            0
          )
          .to(
            brandRef.current,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              x: 0,
              y: 0,
              duration: 0.34,
              ease: "power4.out"
            },
            0.02
          )
          .to(
            lineRef.current,
            { autoAlpha: 1, scaleX: 1, duration: 0.24, ease: "power2.out" },
            0.2
          )
          .to(
            stageRef.current,
            { autoAlpha: 1, scale: 1, duration: 0.32, ease: "power3.out" },
            0.12
          )
          .to(
            boxRigRef.current,
            {
              autoAlpha: 1,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              y: 0,
              duration: 0.44,
              ease: "power4.out"
            },
            0.22
          )
          .to(
            fieldRef.current,
            { autoAlpha: 1, scaleX: 1, duration: 0.32, ease: "power2.out" },
            0.42
          )
          .to(
            boxRigRef.current,
            { rotateY: -3, scale: 1.04, y: -8, duration: 0.22, ease: "sine.inOut" },
            0.62
          )
          .to(
            lidRef.current,
            {
              rotateX: -66,
              scale: 0.98,
              y: -40,
              z: 88,
              duration: 0.68,
              ease: "power3.inOut"
            },
            0.72
          )
          .to(
            innerGlowRef.current,
            { autoAlpha: 1, scale: 1, duration: 0.34, ease: "power3.out" },
            0.82
          )
          .to(
            auraRef.current,
            { autoAlpha: 0.84, scale: 1.18, duration: 0.48, ease: "power2.out" },
            0.9
          )
          .to(
            boxRigRef.current,
            {
              rotateY: -8,
              scale: finalBoxScale,
              y: finalBoxY,
              duration: 0.82,
              ease: "power3.inOut"
            },
            1
          );

        productCards.forEach((card, index) => {
          const position = positions[index];
          const marker = markers[index];
          const at = 1.08 + index * 0.06;

          timeline.to(
            card,
            {
              autoAlpha: 1,
              clipPath: "inset(0% 0% round 8px)",
              duration: 0.86,
              ease: "power3.inOut",
              rotation: position.rotation,
              scale: position.scale,
              x: position.x,
              y: position.y
            },
            at
          );

          if (marker) {
            timeline.to(
              marker,
              { autoAlpha: 1, scale: 1.12, duration: 0.22, ease: "power2.out" },
              at + 0.08
            );
          }
        });

        timeline
          .to(productCards, { y: "+=8", duration: 0.3, ease: "sine.inOut" }, 1.86)
          .to(auraRef.current, { autoAlpha: 0.42, duration: 0.24, ease: "none" }, 1.9)
          .to(fieldRef.current, { autoAlpha: 0.34, duration: 0.24, ease: "none" }, 1.9);

        return () => timeline.kill();
      }

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ritual"
      ref={sectionRef}
      className="relative h-screen min-h-[780px] overflow-hidden bg-luaz-ink px-5 md:px-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#eaf0ec,#d8e4df_42%,#f6f7f2)]" />
      <img
        ref={ambientRef}
        src="/assets/back_box_sample_1.png"
        alt="Open LUAZ ritual box interior"
        className="absolute inset-0 h-full w-full transform-gpu object-cover object-center opacity-[0.12] saturate-[0.72]"
      />
      <div className="luaz-noise absolute inset-0 opacity-[0.24]" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto grid w-full max-w-[1540px] items-center gap-10 md:grid-cols-[0.58fr_1.42fr] md:gap-12">
          <div ref={brandRef} className="max-w-[520px]">
            <p className="text-[12px] uppercase text-luaz-mineral">After the first breath</p>
            <h2 className="mt-5 font-display text-[5.8rem] leading-[0.78] text-luaz-paper md:text-[8.8rem]">
              LUAZ
            </h2>
            <div
              ref={lineRef}
              className="mt-7 h-px w-36 origin-left bg-luaz-rose/70 opacity-0"
            />
            <p className="mt-8 max-w-[28rem] text-[17px] leading-8 text-luaz-mist/76">
              The case opens into five quiet instructions: warmth, release,
              scent, atmosphere, and touch.
            </p>
            <div className="mt-9 flex gap-3">
              {products.map((product, index) => (
                <span
                  key={product.id}
                  ref={(node) => {
                    markerRefs.current[index] = node;
                  }}
                  className="grid h-9 w-9 place-items-center rounded-[8px] border border-luaz-paper/12 text-[11px] uppercase text-luaz-paper"
                  style={{ color: product.tone }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={stageRef}
            className="stage-perspective relative h-[600px] w-full md:h-[680px]"
          >
            <div
              ref={fieldRef}
              className="absolute left-1/2 top-1/2 h-px w-[min(86vw,980px)] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(23,43,40,0.12),rgba(120,157,132,0.28),rgba(197,127,132,0.22),transparent)] opacity-0"
            />
            <div
              ref={boxRigRef}
              className="absolute left-1/2 top-1/2 z-20 w-[236px] -translate-x-1/2 -translate-y-1/2 transform-gpu md:w-[338px]"
            >
              <div className="opening-box relative aspect-[1/1.25]">
                <div className="absolute inset-0 overflow-hidden rounded-[8px] border border-luaz-paper/12 bg-luaz-graphite shadow-lift">
                  <img
                    src="/assets/back_box_sample_1.png"
                    alt="LUAZ ritual box interior"
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.86] saturate-[0.92]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,247,242,0.08),rgba(23,43,40,0.24))]" />
                  <div
                    ref={innerGlowRef}
                    className="absolute inset-[14%] rounded-[8px] border border-luaz-paper/10 bg-[radial-gradient(circle,rgba(246,247,242,0.8),rgba(120,157,132,0.24)_48%,transparent_72%)] opacity-0 blur-sm"
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="rounded-[8px] border border-luaz-paper/12 bg-luaz-graphite/54 px-5 py-4 text-center backdrop-blur-sm">
                      <p className="text-[11px] uppercase text-luaz-mist/66">open hour</p>
                      <p className="mt-2 font-display text-[2.7rem] leading-none text-luaz-paper md:text-[3.8rem]">
                        five cues
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  ref={auraRef}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[8px] bg-[radial-gradient(circle,rgba(246,247,242,0.92),rgba(120,157,132,0.2)_44%,transparent_70%)] opacity-0 blur-2xl"
                />
                <div
                  ref={lidRef}
                  className="box-lid absolute inset-0 z-20 overflow-hidden rounded-[8px]"
                >
                  <RitualBox className="h-full w-full" />
                </div>
              </div>
            </div>

            {products.map((product, index) => {
              const hasVideo = isVideoSource(product.video);

              return (
                <div
                  key={product.id}
                  ref={(node) => {
                    productRefs.current[index] = node;
                  }}
                  className="product-shadow absolute left-1/2 top-1/2 z-30 w-[158px] -translate-x-1/2 -translate-y-1/2 transform-gpu md:w-[214px]"
                >
                  <div
                    onPointerEnter={() => handleProductEnter(index)}
                    onPointerLeave={() => handleProductLeave(index)}
                    className="group overflow-hidden rounded-[8px] border border-luaz-paper/12 bg-luaz-graphite shadow-window"
                    style={{ boxShadow: `0 0 70px ${product.tone}18` }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={`${product.name} ritual object`}
                        className="absolute inset-0 h-full w-full object-cover opacity-[0.88] transition duration-700 group-hover:scale-105 group-hover:opacity-[0.66]"
                      />
                      {hasVideo ? (
                        <video
                          ref={(node) => {
                            videoRefs.current[index] = node;
                          }}
                          src={product.video}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,247,242,0.03),rgba(23,43,40,0.3))]" />
                      <div className="absolute left-3 top-3 rounded-[8px] border border-[#f6f7f2]/24 bg-luaz-paper/26 px-3 py-2 text-[10px] uppercase text-[#f6f7f2] opacity-0 backdrop-blur-sm transition duration-500 group-hover:opacity-100">
                        ritual film
                      </div>
                    </div>
                    <div className="px-3 py-3 text-luaz-paper">
                      <div className="flex items-center justify-between gap-3 text-[10px] uppercase">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span style={{ color: product.tone }}>{product.shortLabel}</span>
                      </div>
                      <p className="mt-3 text-[13px] leading-5 text-luaz-mist/74">
                        {product.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
