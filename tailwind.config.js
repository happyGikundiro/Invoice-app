/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        purple: "#7C5DFA",
        lightPurple: "#9277FF",
        darkBlue: "#1E2139",
        lightBlue: "#373B53",
        blueNavy: "#252945",
        lightGrey: "#DFE3FA",
        grey: "#888EB0",
        blueCiel: "#7E88C3",
        red: "#EC5757",
        lightRed: "#9277FF",
        light: "#F8F8FB",
        black: "#0C0E16",
      },

      keyframes: {
        slideLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideLeft: "slideLeft 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
