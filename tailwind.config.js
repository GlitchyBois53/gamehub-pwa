/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        pagination: "34px 1fr 34px",
      },
      backgroundImage: {
        "game-grad": "linear-gradient(94deg, #7E43DF 0.48%, #00D1FF 100%)",
        "success-grad": "linear-gradient(94deg, #3AED4C 0.48%, #6FF27D 100%)",
        "error-grad": "linear-gradient(94deg, #E74242 0.48%, #E07373 100%)",
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
        search: "0px 0px 10px",
      },
    },
    screens: {
      sm: "600px",
      md: "768px",
      lg: "1024px",
      "2xl": "1720px",
    },
  },
  plugins: [],
};
