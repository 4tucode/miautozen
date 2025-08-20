/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: { 500: '#4c7cf0' }
      }
    },
  },
  plugins: [],
}


