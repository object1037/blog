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
        orange: colors.orange,
        ppink: {
          200: '#fd2e7a',
          300: '#df286c',
        },
        warnred: '#EE0000',
      },
      fontFamily: {
        sans: ['Inter', 'YuGothic', "Yu Gothic Medium", "Yu Gothic", ...fontFamily.sans]
      },
      fontSize: {
        '4.5xl': '2.5rem',
      },
      scale: {
        '80': '.8',
      },
      maxWidth: {
        'toc': '14rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
