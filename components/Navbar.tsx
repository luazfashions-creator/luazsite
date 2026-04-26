"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Ritual", href: "#ritual" },
  { label: "Objects", href: "#objects" },
  { label: "Origin", href: "#origin" }
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function Navbar() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 120],
    ["rgba(246, 247, 242, 0)", "rgba(246, 247, 242, 0.88)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 120],
    ["rgba(246, 247, 242, 0)", "rgba(23, 43, 40, 0.12)"]
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 120],
    ["0 0 0 rgba(23, 43, 40, 0)", "0 18px 70px rgba(23, 43, 40, 0.12)"]
  );
  const color = useTransform(
    scrollY,
    [0, 120],
    ["#f6f7f2", "#172b28"]
  );
  const brandOpacity = useTransform(scrollY, [0, 140, 240], [0, 0, 1]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
      style={{
        backgroundColor,
        borderColor,
        boxShadow,
        color,
        backdropFilter: "blur(18px) saturate(118%)",
        WebkitBackdropFilter: "blur(18px) saturate(118%)"
      }}
      className="fixed left-0 top-0 z-50 w-full border-b px-4 py-3 md:px-8 md:py-4"
    >
      <nav className="mx-auto grid max-w-[1720px] grid-cols-[auto_1fr] items-center text-[11px] uppercase md:grid-cols-[1fr_auto_1fr] md:text-[12px]">
        <a
          href="#objects"
          className="group relative hidden items-center gap-3 justify-self-start py-2 md:inline-flex"
        >
          <span className="h-px w-8 bg-current opacity-[0.42] transition-all duration-700 group-hover:w-11 group-hover:opacity-[0.82]" />
          Shop ritual
        </a>

        <motion.a
          href="#top"
          style={{ opacity: isMobile ? 1 : brandOpacity }}
          className="group relative justify-self-start py-2 font-semibold md:justify-self-center"
          aria-label="LUAZ home"
        >
          LUAZ
          <span className="absolute -bottom-0 left-1/2 h-px w-8 -translate-x-1/2 scale-x-0 bg-current opacity-60 transition-transform duration-700 group-hover:scale-x-100" />
        </motion.a>

        <div className="flex items-center justify-end gap-4 justify-self-end md:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative hidden py-2 opacity-[0.72] transition-opacity duration-500 hover:opacity-100 md:inline-flex"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current opacity-[0.76] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="#invitation"
            className="group relative inline-flex max-w-[9.5rem] py-2 text-right opacity-90 transition-opacity duration-500 hover:opacity-100"
          >
            <span>Enter quiet</span>
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 bg-current opacity-60 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[1.18]" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
