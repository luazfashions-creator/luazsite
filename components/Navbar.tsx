"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const links = [
    { name: "Home", href: "#home" },
    { name: "Ritual", href: "#ritual" },
    { name: "Companion", href: "#app-companion" },
    { name: "Founder", href: "#founder-story" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("luaz-theme");
    const initialTheme = savedTheme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("luaz-theme", nextTheme);
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-0 right-0 top-2 z-50 flex justify-center px-4 sm:top-3"
    >
      <div className="theme-nav flex w-full max-w-5xl items-center justify-between rounded-full border border-white/5 bg-black/20 px-5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-md sm:px-8">
        <div className="theme-nav-text font-serif text-lg font-medium tracking-[0.15em] text-white">
          LUAZ
        </div>
        
        <div className="hidden items-center gap-10 text-[12px] font-medium uppercase tracking-[0.1em] text-white/60 md:flex">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="theme-nav-link transition-colors duration-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="theme-toggle-button grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10 text-white transition duration-300 hover:scale-105"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="theme-cta hidden rounded-full bg-white px-5 py-2 text-[13px] font-medium text-black transition-transform duration-300 hover:scale-105 sm:block">
            Buy Ritual Now
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
