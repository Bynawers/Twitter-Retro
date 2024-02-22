/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        twitterFont: ["Roboto Font"],
      },
      screens: {
        sm: "500px",
      },
      colors: {
        twitter: "#00ADED",
        background: "#ffffff",
        foreground: "#f7f9f9",
        black: "#0f1419",
        blackLight: "#161a1f",
        text: "#4e5255",
      },
      dark: {
        background: "#000000",
        foreground: "#16181c",
        text: "#c0c2c3",
        white: "#eff3f4",
      },
    },
  },
  plugins: [],
};
