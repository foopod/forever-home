/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"'],
        exo: ['"Exo 2"'],
        grape: ['"Grape Nuts"'],
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

