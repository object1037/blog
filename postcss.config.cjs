module.exports = {
  plugins: {
    'postcss-nested': {},
    'postcss-prune-var': { skip: ['node_modules/**'] },
    autoprefixer: {},
  },
}
