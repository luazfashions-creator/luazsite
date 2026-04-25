"use client";

import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.07,
      smoothWheel: true,
      touchMultiplier: 2
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    const syncHashTarget = () => {
      const { hash } = window.location;
      if (!hash) return;

      const target = document.querySelector(hash);
      if (!target) return;

      lenis.scrollTo(target as HTMLElement, { immediate: true });
      ScrollTrigger.refresh();
    };

    const rafId = window.requestAnimationFrame(syncHashTarget);
    window.addEventListener("hashchange", syncHashTarget);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("hashchange", syncHashTarget);
      gsap.ticker.remove(update);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
