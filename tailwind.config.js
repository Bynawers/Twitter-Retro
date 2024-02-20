/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        twitterFont: ["Roboto Font"],
      },
      colors: {
        twitter: "#00ADED",
        // définir couleurs
      },
    },
  },
  plugins: [],
};
