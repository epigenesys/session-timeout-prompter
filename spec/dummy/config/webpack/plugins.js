const webpack = require('webpack')

module.exports = new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
  jquery: 'jquery',
  Popper: ["popper.js", "default"]
})