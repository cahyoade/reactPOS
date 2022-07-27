/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "mainBlue" : "#1C9CC2",
        "mainRed" : "#FF6384",
      },
    },
  },
  plugins: [],
}
