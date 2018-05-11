const webpackMerge = require('webpack-merge');

const webpackParts = require('./webpack.parts');

const webpackConfigProd = webpackMerge([
  {
    mode: 'production',
  },
  webpackParts.loadStyles({
    use: [{
      loader: "style-loader", // creates style nodes from JS strings
    }, {
      loader: "css-loader", // translates CSS into CommonJS
    },
    webpackParts.autoprefixCSS,
    {
      loader: "sass-loader", // compiles Sass to CSS
    }],
  }),
  
//  webpackParts.minifyCSS(),
  webpackParts.loadImages({
    options: {
      limit: 150000,
    },
  }),
//  webpackParts.minifyJavascript(),
]);

module.exports = webpackConfigProd;
