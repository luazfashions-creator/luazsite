"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const links = [
    { name: "Home", href: "#home" },
    { name: "Ritual", href: "#ritual" },
    { name: "Inside", href: "#inside" },
    { name: "Science", href: "#science" },
  ];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("luaz-theme");
    const initialTheme = savedTheme === "light" ? "light" : "dark";

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
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="theme-nav flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-black/36 px-4 py-3 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-6">
        <div className="theme-nav-text text-sm font-medium uppercase tracking-widest text-white">
          LUAZ
        </div>
        
        <div className="hidden items-center gap-8 text-[13px] font-light tracking-wide text-white/70 md:flex">
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
