import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00A2FF",
        primaryDark: "#0086CC",
        secondary: "#60D937",
      },
      fontFamily: {
        lexend: ["var(--font-lexend)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        merriweather: ["var(--font-merriweather)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
