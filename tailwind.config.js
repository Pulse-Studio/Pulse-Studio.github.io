/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-secondary': '#1a1a1a',
        'dark-bg': '#111827',
        'dark-custom': '#1F2937',
        'crimson-accent': '#DC2626',
      },
    },
  },
  plugins: [],
}