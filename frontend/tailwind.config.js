/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#17D87A",
        light: "#D3FFEA",
        dark: "#05AC5B",
        stock :"#69f1b00d"
      },
    },
  },
  plugins: [],
};
