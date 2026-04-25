"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.82
    });

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }

        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          bottom: window.innerHeight,
          height: window.innerHeight,
          left: 0,
          right: window.innerWidth,
          top: 0,
          width: window.innerWidth
        };
      },
      pinType: root.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.defaults({ scroller: root });
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      ScrollTrigger.defaults({ scroller: undefined });
    };
  }, []);
}
