import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "10xl": "11.0rem",
        "13xl": "13.0rem",
        "15xl": "16.0rem",
      },
      fontFamily: {
        cavean: ["Caveat"],
        kanit: ["Kanit"],
        rubik: ["Rubik"],
      },
      height: {
        "45rem": "38rem",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
