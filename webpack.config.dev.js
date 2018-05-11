const webpackMerge = require('webpack-merge');

const webpackParts = require('./webpack.parts');

const webpackConfigDev = webpackMerge([
  {
    mode: 'development',
  },
  {
    output: {
      publicPath: '/',
    },
  },
  webpackParts.devServer(),
  webpackParts.loadStyles({
    use: [{
      loader: "style-loader", // creates style nodes from JS strings
    }, {
      loader: "css-loader", // translates CSS into CommonJS
    }, {
      loader: "sass-loader", // compiles Sass to CSS
    }],
  }),
  webpackParts.loadImages(),
]);

module.exports = webpackConfigDev;
