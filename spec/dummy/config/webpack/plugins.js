const webpack = require('webpack')

module.exports = new webpack.ProvidePlugin({
  $: require.resolve('jquery'),
  jQuery: require.resolve('jquery'),
  Popper: ["popper.js", "default"]
})