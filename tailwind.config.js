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
        md: "1000px",
        lg: "1100px",
      },
      colors: {
        twitter: "#00ADED",
        twitterDark: "#1a8cd8",
        background: "#ffffff",
        foreground: "#f7f9f9",
        foregroundHover: "#eff1f1",
        black: "#0f1419",
        blackLight: "#161a1f",
        text: "#4e5255",
        textLight: "#697883",
        iconBackgroundHover: "#dae8f0",
        banner: "#cfd9de",
        icon: {
          default: {
            color: "#536471",
            background: "#61b7f0",
          },
          retweet: {
            color: "#13ba82",
            background: "#def1eb",
          },
        },
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

/*
color: "#536471",
            background: "#61b7f0",
            */

//"#e7e7e8 Default background hover button
