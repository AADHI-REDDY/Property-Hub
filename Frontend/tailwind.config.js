/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // "sans" is the default font class in Tailwind
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}