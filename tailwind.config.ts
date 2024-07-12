import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    extend: {
      width:{
sectionHome:"90%"
      },
      colors: {
        "primary-60":"#f7f7f9", 
        "secondary-30":"#141936",
        "btn-color":"#6f38df",
        "accent-10":"#1dc7b6",

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        flipAndBack: {
          "0%,100%": { transform: "scaleX(1)" },
          "50%": { transform: "scaleX(-1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        wiggle: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out ",
        animateFadeIn: "fadeIn 1s ease-in-out forwards",
        flipAndBack: "flipAndBack 0.5s ease-in-out ",
        "marquee-infinite": "marquee 25s linear infinite",
        "marquee2-infinite": "marquee2 25s linear infinite",
      }, fontSize: {
        paragraph: ['16px', { lineHeight: '1rem' }],
        LinkItem: ['18px', { lineHeight: '2rem' }],
    }
      
    },
  },
};
export default config;
