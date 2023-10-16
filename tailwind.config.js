/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "game-grad": "linear-gradient(94deg, #7E43DF 0.48%, #00D1FF 100%)",
      },
      minHeight: {
        screen: "100svh",
        mobile: "calc(100svh - 96px)",
      },
      colors: {
        "back-dark": "#151515",
        "back-light": "#f9f9f9",
        "txt-light": "#202020",
      },
      boxShadow: {
        nav: "0px 0px 30px",
      },
    },
  },
  plugins: [],
};
