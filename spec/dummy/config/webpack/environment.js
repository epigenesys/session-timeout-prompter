const { environment } = require('@rails/webpacker');
const plugins = require('./plugins');

environment.plugins.prepend('Provide', plugins);
// environment.config.set('resolve.alias', { jquery: 'jquery/src/jquery '});

module.exports = environment;