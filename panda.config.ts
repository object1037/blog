import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

const globalCss = defineGlobalStyles({
  'html, body': {
    bg: 'neutral.50',
    color: 'neutral.900',
  },
  body: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '100%',
    minHeight: '100svh',
  },
})

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./app/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  strictTokens: true,
  strictPropertyValues: true,

  // Useful for theme customization
  theme: {
    extend: {},
  },

  patterns: {
    extend: {
      container: {
        transform(props) {
          return {
            position: 'relative',
            w: 'full',
            maxWidth: '4xl',
            mx: 'auto',
            px: { base: '4', md: '6', lg: '8' },
            ...props,
          }
        },
      },
      button: {
        description: 'A simple button',
        transform(props) {
          return {
            fontSize: 'sm',
            fontWeight: 'medium',
            rounded: 'sm',
            _hover: { bg: 'neutral.200' },
            transition: 'background',
            cursor: 'pointer',
            ...props,
          }
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  globalCss,
})
