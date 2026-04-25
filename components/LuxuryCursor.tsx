"use client";

import { useEffect, useRef } from "react";

export function LuxuryCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer || !cursorRef.current) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let frame = 0;
    let active = false;
    const cursor = cursorRef.current;

    const move = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
    };

    const over = (event: MouseEvent) => {
      active = Boolean((event.target as HTMLElement).closest("a, button"));
      cursor.dataset.active = active ? "true" : "false";
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full border border-luaz-paper/30 opacity-70 transition-[height,width,border-color,opacity] duration-300 data-[active=true]:h-12 data-[active=true]:w-12 data-[active=true]:border-luaz-herb/70 md:block"
      aria-hidden="true"
    />
  );
}
