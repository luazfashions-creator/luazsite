"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Scene1_Identity() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const leftDetailRef = useRef<HTMLDivElement | null>(null);
  const rightDetailRef = useRef<HTMLDivElement | null>(null);
  const thresholdRef = useRef<HTMLDivElement | null>(null);
  const thresholdGlowRef = useRef<HTMLDivElement | null>(null);
  const riseNoteRef = useRef<HTMLParagraphElement | null>(null);
  const nextNoteRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const word = wordRef.current;
    const tagline = taglineRef.current;
    const leftDetail = leftDetailRef.current;
    const rightDetail = rightDetailRef.current;
    const threshold = thresholdRef.current;
    const thresholdGlow = thresholdGlowRef.current;
    const riseNote = riseNoteRef.current;
    const nextNote = nextNoteRef.current;
    if (
      !section ||
      !word ||
      !tagline ||
      !leftDetail ||
      !rightDetail ||
      !threshold ||
      !thresholdGlow ||
      !riseNote ||
      !nextNote
    ) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      gsap.set(word, {
        filter: "blur(0px)",
        fontSize: "22vw",
        letterSpacing: "0.16em",
        opacity: 1,
        y: 0
      });
      gsap.set(tagline, { filter: "blur(0px)", opacity: 1, y: 0 });
      gsap.set([leftDetail, rightDetail], { opacity: 0 });
      gsap.set([threshold, thresholdGlow], { opacity: 0 });
      gsap.set([riseNote, nextNote], { opacity: 0 });
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
        transformOrigin: "50% 58%",
        willChange: "clip-path, font-size, letter-spacing, transform, opacity, filter",
        y: "42vh"
      });
      gsap.set(tagline, {
        filter: "blur(10px)",
        opacity: 0,
        willChange: "opacity, transform, filter",
        y: 30
      });
      gsap.set([leftDetail, rightDetail], { opacity: 0, willChange: "opacity" });
      gsap.set(threshold, {
        opacity: 0,
        scaleX: 0.12,
        transformOrigin: "50% 50%",
        willChange: "opacity, transform"
      });
      gsap.set(thresholdGlow, {
        opacity: 0,
        scaleX: 0.65,
        scaleY: 0.35,
        transformOrigin: "50% 50%",
        willChange: "opacity, transform"
      });
      gsap.set([riseNote, nextNote], {
        opacity: 0,
        willChange: "opacity, transform"
      });
      gsap.set(riseNote, { y: 10 });
      gsap.set(nextNote, { y: 10 });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out"
        },
        scrollTrigger: {
          anticipatePin: 1,
          end: "+=300%",
          onEnter: () => {
            word.style.willChange = "clip-path, font-size, letter-spacing, transform, opacity, filter";
            tagline.style.willChange = "opacity, transform, filter";
            leftDetail.style.willChange = "opacity";
            rightDetail.style.willChange = "opacity";
            threshold.style.willChange = "opacity, transform";
            thresholdGlow.style.willChange = "opacity, transform";
            riseNote.style.willChange = "opacity, transform";
            nextNote.style.willChange = "opacity, transform";
          },
          onEnterBack: () => {
            word.style.willChange = "clip-path, font-size, letter-spacing, transform, opacity, filter";
            tagline.style.willChange = "opacity, transform, filter";
            leftDetail.style.willChange = "opacity";
            rightDetail.style.willChange = "opacity";
            threshold.style.willChange = "opacity, transform";
            thresholdGlow.style.willChange = "opacity, transform";
            riseNote.style.willChange = "opacity, transform";
            nextNote.style.willChange = "opacity, transform";
          },
          onLeave: () => {
            [
              word,
              tagline,
              leftDetail,
              rightDetail,
              threshold,
              thresholdGlow,
              riseNote,
              nextNote
            ].forEach((node) => {
              node.style.willChange = "";
            });
          },
          onLeaveBack: () => {
            [
              word,
              tagline,
              leftDetail,
              rightDetail,
              threshold,
              thresholdGlow,
              riseNote,
              nextNote
            ].forEach((node) => {
              node.style.willChange = "";
            });
          },
          pin: true,
          scrub: 1.5,
          start: "top top",
          trigger: section
        }
      });

      timeline
        .to(
          word,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.38,
            filter: "blur(0px)",
            fontSize: "28vw",
            letterSpacing: "0.05em",
            opacity: 1,
            rotateX: 0,
            scale: 1,
            y: "-2vh"
          },
          0
        )
        .to(
          riseNote,
          {
            duration: 0.16,
            opacity: 0.62,
            y: 0
          },
          0.04
        )
        .to(
          [leftDetail, rightDetail],
          { duration: 0.18, opacity: 1 },
          0.12
        )
        .to(
          tagline,
          {
            duration: 0.18,
            filter: "blur(0px)",
            opacity: 1,
            y: 0
          },
          0.3
        )
        .to(
          [leftDetail, rightDetail],
          { duration: 0.16, opacity: 0 },
          0.46
        )
        .to(
          word,
          {
            duration: 0.24,
            fontSize: "19vw",
            letterSpacing: "0.16em",
            y: "-11vh"
          },
          0.42
        )
        .to(
          tagline,
          {
            duration: 0.2,
            y: -18
          },
          0.44
        )
        .to(
          threshold,
          {
            duration: 0.2,
            opacity: 0.8,
            scaleX: 1
          },
          0.5
        )
        .to(
          thresholdGlow,
          {
            duration: 0.24,
            opacity: 0.72,
            scaleX: 1,
            scaleY: 1
          },
          0.54
        )
        .to(
          nextNote,
          {
            duration: 0.18,
            opacity: 0.54,
            y: 0
          },
          0.56
        )
        .to(
          riseNote,
          {
            duration: 0.16,
            opacity: 0,
            y: -8
          },
          0.6
        )
        .to(
          tagline,
          {
            duration: 0.2,
            filter: "blur(7px)",
            opacity: 0,
            y: -36
          },
          0.68
        )
        .to(
          word,
          {
            duration: 0.32,
            filter: "blur(10px)",
            fontSize: "8.5vw",
            letterSpacing: "0.52em",
            opacity: 0,
            scale: 0.92,
            y: "-38vh"
          },
          0.66
        )
        .to(
          nextNote,
          {
            duration: 0.14,
            opacity: 0,
            y: -12
          },
          0.78
        )
        .to(
          threshold,
          {
            duration: 0.18,
            opacity: 0,
            scaleX: 1.7
          },
          0.84
        )
        .to(
          thresholdGlow,
          {
            duration: 0.18,
            opacity: 0,
            scaleX: 1.55,
            scaleY: 0.75
          },
          0.86
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-luaz-white md:h-[300vh]"
    >
      <div className="sticky top-0 grid h-screen place-items-center overflow-hidden">
        <p
          ref={riseNoteRef}
          className="absolute left-1/2 top-10 hidden -translate-x-1/2 whitespace-nowrap font-display text-[10px] font-light uppercase tracking-[0.5em] text-luaz-grey md:block"
        >
          Rise. Slowly. Return.
        </p>
        <p
          ref={nextNoteRef}
          className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-display text-[10px] font-light uppercase tracking-[0.5em] text-luaz-grey md:block"
        >
          The ritual waits in stillness
        </p>
        <div
          ref={thresholdGlowRef}
          className="pointer-events-none absolute bottom-[22vh] left-1/2 h-[18vh] w-[52vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,227,220,0.58)_0%,rgba(248,246,242,0.22)_48%,transparent_74%)] opacity-0 blur-2xl"
        />
        <div
          ref={thresholdRef}
          className="pointer-events-none absolute bottom-[24vh] left-1/2 h-px w-[34vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(212,206,198,0.82),transparent)] opacity-0"
        />
        <div
          ref={leftDetailRef}
          className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 text-luaz-mist md:flex"
        >
          <div className="h-[60px] w-px bg-luaz-mist" />
          <p className="[writing-mode:vertical-rl] font-body text-[9px] font-light uppercase tracking-[0.3em]">
            EST. RITUAL
          </p>
        </div>
        <div
          ref={rightDetailRef}
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 text-luaz-mist md:flex"
        >
          <div className="h-[60px] w-px bg-luaz-mist" />
          <p className="[writing-mode:vertical-lr] font-body text-[9px] font-light uppercase tracking-[0.3em]">
            NATURE. PRECISION.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <h1
            ref={wordRef}
            className="font-display font-light uppercase leading-none text-luaz-deep"
          >
            LUAZ
          </h1>
          <p
            ref={taglineRef}
            className="mt-10 font-display text-[1.1rem] font-light italic tracking-[0.3em] text-luaz-grey"
          >
            Instantly calms you down
          </p>
        </div>
      </div>
    </section>
  );
}
