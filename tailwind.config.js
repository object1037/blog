const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  //mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        ppink: '#fd2e7a',
        rose: colors.rose,
        warnred: '#EE0000',
      },
      maxHeight: {
        'screen-12': 'calc(100vh - 3rem)',
      },
      fontFamily: {
        sans: ['Inter', 'YuGothic', "Yu Gothic Medium", "Yu Gothic", ...fontFamily.sans]
      },
      fontSize: {
        '4.5xl': '2.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
