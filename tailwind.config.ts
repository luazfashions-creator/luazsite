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
        "luaz-white": "#F8F6F2",
        "luaz-stone": "#EDE8E0",
        "luaz-mist": "#D4CEC6",
        "luaz-grey": "#9E9890",
        "luaz-deep": "#2A2724",
        "luaz-accent": "#B8A898",
        "luaz-night": "#111916",
        "luaz-forest": "#17231F",
        "luaz-ember": "#C9B28E",
        luaz: {
          white: "#F8F6F2",
          stone: "#EDE8E0",
          mist: "#D4CEC6",
          grey: "#9E9890",
          "warm-grey": "#9E9890",
          deep: "#2A2724",
          accent: "#B8A898",
          night: "#111916",
          forest: "#17231F",
          ember: "#C9B28E"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        heading: ["var(--font-display)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "Cormorant Garamond", "serif"]
      },
      boxShadow: {
        soft: "0 40px 120px rgba(42,39,36,0.15), 0 8px 32px rgba(42,39,36,0.08)",
        hover: "0 52px 140px rgba(42,39,36,0.18), 0 16px 48px rgba(42,39,36,0.1)"
      },
      letterSpacing: {
        hero: "0.45em",
        ritual: "0.25em"
      }
    }
  },
  plugins: []
};

export default config;
