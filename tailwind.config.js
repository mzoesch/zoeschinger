/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx}',
    // './pages/**/*.{js,ts,jsx,tsx}',
    // './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121827',
        primaryLight: '#ffffff',
        secondary: '',
      },
      keyframes: {
        magic_background_transform: {
          '0%': { 'background-position': '0%' },
          '100%': { 'background-position': '-200%' },
        },
      },
      animation: {
        magic_background: 'magic_background_transform 2s linear infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
