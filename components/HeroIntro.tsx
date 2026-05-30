"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function HeroIntro() {
  const [currentTime, setCurrentTime] = useState("");
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordWrapRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLHeadingElement | null>(null);
  const calmRef = useRef<HTMLParagraphElement | null>(null);
  const subRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLVideoElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function updateTime() {
      setCurrentTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Berlin"
        }).format(new Date())
      );
    }

    updateTime();
    const interval = window.setInterval(updateTime, 30000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      gsap.set(
        [
          imageRef.current,
          wordWrapRef.current,
          wordRef.current,
          calmRef.current,
          subRef.current,
          cueRef.current,
          metaRef.current,
          lineRef.current
        ],
        {
          willChange: "transform, opacity"
        }
      );

      gsap.set(wordWrapRef.current, {
        autoAlpha: 0,
        scale: 0.94,
        transformOrigin: "50% 50%",
        xPercent: -50,
        y: 82,
        yPercent: -50
      });
      gsap.set([calmRef.current, subRef.current, metaRef.current], {
        autoAlpha: 0,
        y: 24
      });
      gsap.set(lineRef.current, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "50% 50%"
      });
      gsap.set(cueRef.current, {
        autoAlpha: 0,
        y: -8
      });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          imageRef.current,
          { autoAlpha: 0.72, scale: 1.08, y: 18 },
          { autoAlpha: 1, scale: 1.035, y: 0, duration: 2.4, force3D: true },
          0
        )
        .fromTo(
          veilRef.current,
          { autoAlpha: 0.82 },
          { autoAlpha: 1, duration: 1.8 },
          0
        )
        .to(cueRef.current, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.7);

      function buildTimeline(finalXPercent: number, finalScale: number, finalY: number) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2200",
            scrub: 1.45,
            pin: true,
            anticipatePin: 1
          }
        });

        timeline
          .to(imageRef.current, { scale: 1.01, y: -18, duration: 0.22, ease: "none" }, 0)
          .to(veilRef.current, { autoAlpha: 0.92, duration: 0.22, ease: "none" }, 0)
          .to(cueRef.current, { autoAlpha: 0, y: 20, duration: 0.18, ease: "sine.inOut" }, 0.04)
          .to(
            wordWrapRef.current,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.32,
              ease: "power4.out"
            },
            0.18
          )
          .to(
            calmRef.current,
            { autoAlpha: 1, y: 0, duration: 0.24, ease: "power3.out" },
            0.28
          )
          .to(
            subRef.current,
            { autoAlpha: 1, y: 0, duration: 0.22, ease: "power3.out" },
            0.34
          )
          .to(
            lineRef.current,
            { autoAlpha: 1, scaleX: 1, duration: 0.22, ease: "power2.out" },
            0.38
          )
          .to(
            metaRef.current,
            { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" },
            0.42
          )
          .to(
            imageRef.current,
            { scale: 1.09, y: -48, autoAlpha: 0.86, duration: 0.48, ease: "sine.inOut" },
            0.55
          )
          .to(veilRef.current, { autoAlpha: 0.98, duration: 0.42, ease: "sine.inOut" }, 0.56)
          .to(
            wordWrapRef.current,
            {
              xPercent: finalXPercent,
              y: finalY,
              scale: finalScale,
              duration: 0.48,
              ease: "power3.inOut"
            },
            0.58
          )
          .to(
            [calmRef.current, subRef.current],
            { autoAlpha: 0.42, y: -10, duration: 0.34, ease: "sine.inOut" },
            0.64
          )
          .to(lineRef.current, { scaleX: 0.58, autoAlpha: 0.38, duration: 0.28 }, 0.68)
          .to(metaRef.current, { autoAlpha: 0.26, y: -18, duration: 0.28 }, 0.72);

        return () => timeline.kill();
      }

      mm.add("(min-width: 768px)", () => buildTimeline(-82, 0.52, -18));
      mm.add("(max-width: 767px)", () => buildTimeline(-50, 0.72, -96));

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="cinema-vignette relative grid h-[100svh] min-h-[620px] place-items-center overflow-hidden bg-[#172b28]"
    >
      <video
        ref={imageRef}
        src="/herovideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full scale-[1.03] transform-gpu object-cover object-[43%_center] opacity-100 saturate-[0.96]"
      />
      <div
        ref={veilRef}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,28,26,0.46),rgba(16,28,26,0.05)_43%,rgba(16,28,26,0.58)),linear-gradient(180deg,rgba(16,28,26,0.04),rgba(16,28,26,0.42)_82%,#eaf0ec_100%)]"
      />
      <div className="luaz-noise absolute inset-0 opacity-[0.2]" />
      <div
        ref={metaRef}
        className="absolute left-5 right-5 top-24 z-10 flex items-center justify-between text-[11px] uppercase text-[#f6f7f2]/76 md:left-8 md:right-8 md:top-28"
      >
        <span>Crafted in the Himalaya</span>
        <span>{currentTime || "now"} - last hour</span>
      </div>
      <div
        ref={wordWrapRef}
        className="absolute left-1/2 top-1/2 z-10 w-[calc(100%_-_40px)] max-w-[1680px] px-5 text-center text-[#f6f7f2] md:w-[calc(100%_-_64px)] md:px-8"
      >
        <h1
          ref={wordRef}
          className="font-serif text-[7rem] leading-[0.78] md:text-[12rem] lg:text-[16rem] xl:text-[19rem]"
        >
          LUAZ
        </h1>
        <p
          ref={calmRef}
          className="mt-7 font-serif text-[2.5rem] leading-[0.95] text-[#f6f7f2] md:mt-4 md:text-[4.8rem]"
        >
          Instantly calms you down.
        </p>
        <div ref={subRef} className="mx-auto mt-7 max-w-[560px]">
          <p className="text-[12px] uppercase text-[#f6f7f2]/72">
            The last hour made deliberate
          </p>
          <p className="mt-5 text-[20px] leading-8 text-[#f6f7f2]/88 md:text-[25px] md:leading-9">
            A composed evening system for warmth, release, scent, atmosphere,
            and sleep-ready touch.
          </p>
          <div
            ref={lineRef}
            className="mx-auto mt-8 h-px w-44 origin-center bg-[#f6f7f2]/56"
          />
        </div>
      </div>
      <div
        ref={cueRef}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase text-[#f6f7f2]/62"
      >
        Scroll
      </div>
    </section>
  );
}
