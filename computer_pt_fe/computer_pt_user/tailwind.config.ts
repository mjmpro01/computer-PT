import { Config } from "tailwindcss";

export default {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./build/**/*.{js,jsx,ts,tsx,pug,html}",
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [
    // require("tw-elements/dist/plugin.cjs"),
    // require("flowbite/plugin"),
    // function ({ addUtilities }) {
    //   addUtilities({
    //     ".no-scrollbar": {
    //       "::-webkit-scrollbar": {
    //         display: "none",
    //       },
    //       "-ms-overflow-style": "none",
    //       "scrollbar-width": "none",
    //     },
    //   });
    // },
  ],
} satisfies Config;
