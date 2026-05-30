import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obsidian: "#101311",
        sand: "#C9B28E",
        sage: "#768F84",
        "luaz-bg": "#f5f3ef",
        "luaz-bg-soft": "#ebe7df",
        "luaz-card": "#ffffff",
        "luaz-stone": "#d8d3ca",
        "luaz-ash": "#b9b7b2",
        "luaz-silver": "#e6e6e3",
        "luaz-text": "#1d1d1f",
        "luaz-text-muted": "#6e6e73",
        "luaz-border": "rgba(29, 29, 31, 0.12)",
        "luaz-gold-soft": "#b8a06a",
        "luaz-warm-shadow": "rgba(70, 60, 45, 0.12)",
        muted: "rgba(29, 29, 31, 0.56)",
        glass: {
          DEFAULT: "rgba(255,255,255,0.4)",
          strong: "rgba(255,255,255,0.7)",
        },
        border: {
          light: "rgba(255,255,255,0.1)",
          medium: "rgba(255,255,255,0.2)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-cormorant)", "var(--font-playfair)", "serif"],
        display: ["var(--font-cormorant)", "var(--font-playfair)", "serif"],
        cursive: ["var(--font-pinyon)", "cursive"],
      },
    }
  },
  plugins: []
};

export default config;
