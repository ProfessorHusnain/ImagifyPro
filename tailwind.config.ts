import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f2f4ff",
          "100": "#e8ebff",
          "200": "#d3d9ff",
          "300": "#b0b9ff",
          "400": "#848dff",
          "500": "#5255ff",
          "600": "#372ef9",
          "700": "#291ce5",
          "800": "#2217c0",
          "900": "#1a1287",
          "950": "#0d0a6b",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
