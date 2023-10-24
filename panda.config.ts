import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

const globalCss = defineGlobalStyles({
  'html, body': {
    bg: 'neutral.50',
    color: 'neutral.900',
  },
})

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // The extension for the emitted JavaScript files
  outExtension: 'js',
  // Where to look for your css declarations
  include: ['./app/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            DEFAULT: { value: '#fd3972' },
            light: { value: '#ffbac1' },
          },
          secondary: {
            DEFAULT: { value: '#40fdad' },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  globalCss,
})
