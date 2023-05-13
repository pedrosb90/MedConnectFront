/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        cimPallete: {
          blue: "#002237",
          gold: "#f2d083",
          DEFAULT: "#91c4cd",
          100: "#9bccbb",
          200: "#73aeac",
          300: "#c7ebf8",
          400: "#91c4cd",
          500: "#76b1b7",
          600: "#5a9da1",
          700: "#498a94",
          800: "#2a6074",
          900: "#032d49",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
