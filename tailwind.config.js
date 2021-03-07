const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.green,
      Blue: colors.blue,
      purple: colors.purple,
      pink: colors.pink,
      twitter: '#1DA1F2',
      ppink: '#ff0f53',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
