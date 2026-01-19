import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f97316", 
        primaryDark: "#ea580c",
        neutral: "#0f172a", 
        neutralSoft: "#64748b", 
      },
    },
  },
  plugins: [],
};

export default config;

