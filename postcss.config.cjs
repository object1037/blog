module.exports = {
  plugins: {
    'postcss-nested': {},
    '@pandacss/dev/postcss': {},
    'postcss-prune-var': { skip: ['node_modules/**'] },
  },
}
