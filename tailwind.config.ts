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
        background: "#050505",
        foreground: "#ffffff",
        muted: "rgba(255,255,255,0.6)",
        glass: {
          DEFAULT: "rgba(255,255,255,0.04)",
          strong: "rgba(255,255,255,0.08)",
        },
        border: {
          light: "rgba(255,255,255,0.1)",
          medium: "rgba(255,255,255,0.2)",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
    }
  },
  plugins: []
};

export default config;
