const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ngray: colors.neutral,
        orange: colors.orange,
        ppink: {
          200: '#fd2e7a',
          300: '#df286c',
        },
        warnred: '#EE0000',
        red: {
          ...colors.red,
          1000: '#260808',
        },
        orange: {
          ...colors.orange,
          1000: '#290f06',
        },
        blue: {
          ...colors.blue,
          1000: '#081026',
        },
      },
      fontFamily: {
        sans: ['Zen Maru Gothic', 'YuGothic', "Yu Gothic Medium", "Yu Gothic", ...fontFamily.sans]
      },
      fontSize: {
        '4.5xl': '2.5rem',
      },
      scale: {
        '80': '.8',
      },
      maxHeight: {
        'toc': 'calc(100vh - 3rem)'
      },
    },
  },
  plugins: [],
}
