"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Scene2_Box() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const topHalfRef = useRef<HTMLDivElement | null>(null);
  const bottomHalfRef = useRef<HTMLDivElement | null>(null);
  const topImageRef = useRef<HTMLImageElement | null>(null);
  const bottomImageRef = useRef<HTMLImageElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const atmosphereRef = useRef<HTMLDivElement | null>(null);
  const floorShadowRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const textOpacity = useTransform(scrollYProgress, [0.35, 0.48, 0.66], [0, 1, 0]);
  const topLeftY = useTransform(scrollYProgress, [0.35, 0.48], [-6, 0]);
  const bottomCenterOpacity = useTransform(scrollYProgress, [0.42, 0.54, 0.66], [0, 1, 0]);
  const bottomRightOpacity = useTransform(scrollYProgress, [0.48, 0.6, 0.66], [0, 1, 0]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const topHalf = topHalfRef.current;
    const bottomHalf = bottomHalfRef.current;
    const topImage = topImageRef.current;
    const bottomImage = bottomImageRef.current;
    const glow = glowRef.current;
    const atmosphere = atmosphereRef.current;
    const floorShadow = floorShadowRef.current;
    if (
      !section ||
      !stage ||
      !topHalf ||
      !bottomHalf ||
      !topImage ||
      !bottomImage ||
      !glow ||
      !atmosphere ||
      !floorShadow
    ) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      gsap.set(stage, {
        height: "126vw",
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        width: "90vw",
        y: 0
      });
      gsap.set([topHalf, bottomHalf], { opacity: 1, y: 0 });
      gsap.set(glow, { opacity: 0.4, scale: 1 });
      gsap.set(floorShadow, { opacity: 0.35, scale: 0.88, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(stage, {
        borderRadius: "8px",
        boxShadow:
          "0 54px 130px rgba(42,39,36,0.16), 0 16px 44px rgba(42,39,36,0.1)",
        height: "32vw",
        opacity: 0.12,
        rotateX: 10,
        rotateY: -12,
        rotateZ: 0.4,
        scale: 0.78,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        width: "30vw",
        willChange: "width, height, transform, opacity",
        y: "18vh"
      });
      gsap.set([topHalf, bottomHalf], {
        opacity: 1,
        willChange: "transform, opacity",
        y: 0
      });
      gsap.set([topImage, bottomImage], {
        objectPosition: "center 50%"
      });
      gsap.set(glow, {
        opacity: 0.1,
        scale: 0.6,
        willChange: "transform, opacity"
      });
      gsap.set(floorShadow, {
        opacity: 0.14,
        scale: 0.52,
        willChange: "transform, opacity",
        y: 96
      });
      gsap.set(atmosphere, { opacity: 0, willChange: "opacity" });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out"
        },
        scrollTrigger: {
          anticipatePin: 1,
          end: "+=300%",
          onEnter: () => {
            stage.style.willChange = "width, height, transform, opacity";
            topHalf.style.willChange = "transform, opacity";
            bottomHalf.style.willChange = "transform, opacity";
            glow.style.willChange = "transform, opacity";
            atmosphere.style.willChange = "opacity";
            floorShadow.style.willChange = "transform, opacity";
          },
          onEnterBack: () => {
            stage.style.willChange = "width, height, transform, opacity";
            topHalf.style.willChange = "transform, opacity";
            bottomHalf.style.willChange = "transform, opacity";
            glow.style.willChange = "transform, opacity";
            atmosphere.style.willChange = "opacity";
            floorShadow.style.willChange = "transform, opacity";
          },
          onLeave: () => {
            [stage, topHalf, bottomHalf, glow, atmosphere, floorShadow].forEach((node) => {
              node.style.willChange = "";
            });
          },
          onLeaveBack: () => {
            [stage, topHalf, bottomHalf, glow, atmosphere, floorShadow].forEach((node) => {
              node.style.willChange = "";
            });
          },
          pin: true,
          scrub: 1.2,
          start: "top top",
          trigger: section
        }
      });

      timeline
        .to(
          stage,
          {
            duration: 0.22,
            height: "50vw",
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            width: "36vw",
            y: 0
          },
          0
        )
        .to(
          floorShadow,
          {
            duration: 0.24,
            opacity: 0.66,
            scale: 1,
            y: 0
          },
          0.02
        )
        .to(atmosphere, { duration: 0.35, opacity: 1 }, 0)
        .to(
          glow,
          {
            duration: 0.22,
            opacity: 0.42,
            scale: 0.95
          },
          0.08
        )
        .to(
          stage,
          {
            borderRadius: "0px",
            boxShadow:
              "0 0 0 rgba(42,39,36,0), 0 0 0 rgba(42,39,36,0)",
            duration: 0.18,
            height: "100vh",
            scale: 1,
            width: "100vw",
            y: 0
          },
          0.2
        )
        .to(
          floorShadow,
          {
            duration: 0.14,
            opacity: 0,
            scale: 1.35,
            y: 28
          },
          0.22
        )
        .to(
          [topImage, bottomImage],
          {
            duration: 0.3,
            objectPosition: "center 45%"
          },
          0.35
        )
        .to(
          topHalf,
          {
            duration: 0.35,
            opacity: 0.6,
            y: "-50vh"
          },
          0.65
        )
        .to(
          bottomHalf,
          {
            duration: 0.35,
            opacity: 0.8,
            y: "15vh"
          },
          0.65
        )
        .to(
          glow,
          {
            duration: 0.35,
            opacity: 1,
            scale: 1.8
          },
          0.65
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
        <div
          ref={atmosphereRef}
          className="absolute inset-0 bg-[rgba(42,39,36,0.04)] opacity-0"
        />
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 h-[56vh] w-[56vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(rgba(253,250,246,0.95),rgba(248,246,242,0.8)_42%,transparent_72%)] opacity-0 blur-2xl"
        />
        <div
          ref={floorShadowRef}
          className="pointer-events-none absolute left-1/2 top-[calc(50%+27vw)] h-[54px] w-[30vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(42,39,36,0.16)_0%,rgba(42,39,36,0.06)_38%,transparent_72%)] opacity-0 blur-xl"
        />

        <div
          ref={stageRef}
          className="relative h-[32vw] w-[30vw] overflow-hidden rounded-[8px]"
        >
          <div
            ref={topHalfRef}
            className="absolute inset-0 overflow-hidden [clip-path:inset(0_0_50%_0)]"
          >
            <Image
              ref={topImageRef}
              src="/box_sample_front.jpeg"
              alt="LUAZ box upper half"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_40%,rgba(42,39,36,0.08)_100%)]" />
          </div>
          <div
            ref={bottomHalfRef}
            className="absolute inset-0 overflow-hidden [clip-path:inset(50%_0_0_0)]"
          >
            <Image
              ref={bottomImageRef}
              src="/box_sample_front.jpeg"
              alt="LUAZ box lower half"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_40%,rgba(42,39,36,0.08)_100%)]" />
          </div>
        </div>

        <motion.p
          className="absolute left-6 top-10 font-body text-[10px] font-light uppercase tracking-[0.5em] text-[rgba(248,246,242,0.7)] md:left-12"
          style={{ opacity: textOpacity, y: topLeftY }}
        >
          THE LUAZ COLLECTION
        </motion.p>
        <motion.p
          className="absolute bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[1.2rem] font-light italic tracking-[0.2em] text-[rgba(248,246,242,0.85)]"
          style={{ opacity: bottomCenterOpacity }}
        >
          Nature. Ritual. Precision.
        </motion.p>
        <motion.p
          className="absolute bottom-14 right-6 hidden font-body text-[9px] font-light uppercase tracking-[0.4em] text-[rgba(248,246,242,0.5)] md:block md:right-12"
          style={{ opacity: bottomRightOpacity }}
        >
          Five Objects. One Intention.
        </motion.p>
      </div>
    </section>
  );
}
