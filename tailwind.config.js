const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        ppink: '#fd2e7a',
        rose: colors.rose,
      },
      maxHeight: {
        'screen-12': 'calc(100vh - 3rem)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
