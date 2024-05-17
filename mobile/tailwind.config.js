/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-red": "#E23E3E",
        "neutral-150": "#F1F1F1",
      },
    },
  },
  plugins: [],
};
