/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'TrevBlue': '#214479',
        'TrevGreen': '#1E6837',
      }
    },
  },
  plugins: [],
}

