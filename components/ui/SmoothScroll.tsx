"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      anchors: {
        offset: -88,
        lerp: 0.18
      },
      lerp: 0.12,
      overscroll: false,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.78,
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null
    });

    const updateScrollTriggers = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTriggers);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    let refreshFrame = 0;
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    };

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
    window.addEventListener("load", refresh);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    refresh();

    return () => {
      window.removeEventListener("load", refresh);
      resizeObserver.disconnect();
      cancelAnimationFrame(refreshFrame);
      lenis.off("scroll", updateScrollTriggers);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
