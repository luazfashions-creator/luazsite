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
          paper: "#172B28",
          void: "#EAF0EC",
          graphite: "#F6F7F2",
          ink: "#D8E4DF",
          herb: "#789D84",
          mineral: "#C57F84",
          rose: "#C57F84",
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
        hover: "0 52px 140px rgba(42,39,36,0.18), 0 16px 48px rgba(42,39,36,0.1)",
        lift: "0 44px 130px rgba(23,43,40,0.18), 0 12px 38px rgba(23,43,40,0.1)",
        window: "0 34px 110px rgba(23,43,40,0.14), 0 8px 28px rgba(23,43,40,0.08)"
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
