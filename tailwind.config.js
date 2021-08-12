module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lavender: "#D9DBF1",
        "lavender-gray": "#D0CDD7",
        "gray-custom": "#ACB0BD",
        "green-custom": "#416165",
        "dark-green-custom": "#0B3948",
      },
      fontFamily: {
        "josephin-sans": ["Josefin Sans", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
