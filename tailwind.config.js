/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: 'white',  // Default background color
      },
      textColor: {
        foreground: 'black',  // Default text color
      }
    },
  },
  plugins: [],
} 