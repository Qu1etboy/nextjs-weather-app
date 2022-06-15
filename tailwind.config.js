/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-d': "url('../images/sky.jpg')",
        'background-n': "url('../images/night.jpg')",
      }
    },
  },
  plugins: [],
}
