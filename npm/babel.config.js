module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          forceAllTransforms: true,
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false,
          exclude: ['transform-typeof-symbol']
        }
      ]
    ],
    plugins: [
      "@babel/plugin-transform-modules-commonjs"
    ]
  }
}
