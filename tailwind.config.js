const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        mainColor: "#9F85F3",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      boxShadow: {
        custom: "-2px -1px 4px 0px rgba(148, 123, 224, 0.25)",
        card: "0px 4px 4px 0px #9F85F31A",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
