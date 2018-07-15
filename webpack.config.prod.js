const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackMerge = require('webpack-merge');

const webpackParts = require('./webpack.parts');

const webpackConfigProd = webpackMerge([
  {
    mode: 'production',
    output: {
      publicPath: '/static-files/',
    },    
  },
  webpackParts.loadAudio({ exclude: /node_modules/ }),
  webpackParts.loadStyles({
    use: [
      MiniCssExtractPlugin.loader, // MiniCssExtractPlugin.loader should be used in production instead of style-loader
      {
        loader: "css-loader", // translates CSS into CommonJS
      },
      webpackParts.autoprefixCSS,
      {
        loader: "sass-loader", // compiles Sass to CSS
      }
    ],
  }),
  webpackParts.minifyCSS(),
  webpackParts.loadImages({
    options: {
      limit: 15000,
    },
  }),
//  webpackParts.minifyJavascript(),
]);

module.exports = webpackConfigProd;
