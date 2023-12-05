import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/preline/dist/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'contact': "url('/contactbg.svg')",
      },
      animation: {
        text: "text 5s ease infinite",
        blob: "blob 7s infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
      colors: {
        primarycolor: "#0027B3",
        secondrycolor: "#F37802",
        textblack: "#353535",
        textsecondry: "#808080",
        whitecard: "#F9F9F9",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("preline/plugin")],
};
export default config;
