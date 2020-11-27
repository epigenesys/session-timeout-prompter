const { environment } = require('@rails/webpacker');
const plugins = require('./plugins');

environment.plugins.prepend('Provide', plugins);

module.exports = environment;