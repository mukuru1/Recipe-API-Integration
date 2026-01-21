/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#0f172a", // Dark Slate / Midnight
      secondary: "#ffffff", // White
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",
      current: "currentColor",
    },
    extend: {},
  },
  plugins: [],
};
