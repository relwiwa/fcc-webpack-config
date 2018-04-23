const webpackMerge = require('webpack-merge');

const webpackConfigCommon = require('./webpack.config.common');
const webpackConfigDev = require('./webpack.config.dev');
const webpackConfigProd = require('./webpack.config.prod');

module.exports = (env) => {
  if (env === 'production') {
    return webpackMerge(webpackConfigCommon, webpackConfigProd);
  }
  return webpackMerge(webpackConfigCommon, webpackConfigDev);
};
