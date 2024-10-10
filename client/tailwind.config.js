/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        franklin: [
          "Franklin Gothic Medium",
          "Arial Narrow",
          "Arial",
          "sans-serif",
        ],
        roboto: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        opensans: ['"Open Sans"', "sans-serif"],
        sans: [ "Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #635dc0, #3027ae)",
      },
    },
  },
  plugins: [],
};
