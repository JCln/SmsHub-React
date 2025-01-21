const plugin = require('tailwindcss/plugin');
const defaultTheme = require('./fonts/Vazirmatn/Vazirmatn-RD[wght].woff2');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        // 'display': [src, 'sans-serif'],
        // 'body': [src],
        'sans': ['Vazirmatn', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
