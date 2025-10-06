/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f1115',
        'dark-secondary': '#161922',
        'dark-custom': '#1f2027',
        'accent-soft': '#facc15',
      },
    },
  },
  plugins: [],
}