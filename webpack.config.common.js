const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const webpackMerge = require('webpack-merge');
const webpackParts = require('./webpack.parts');

const webpackConfigCommon = webpackMerge([
  {
    output: {
      filename: '[name].[chunkhash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../', 'react-client', 'index.html'),
      }),
    ],
  },
  webpackParts.loadAudio({ exclude: /node_modules/ }),
  webpackParts.loadJavascript({ exclude: /node_modules/ }),
  // instead of an entry property for vendor bundle, they are extracted automatically here
  /*webpackParts.extractBundleChunks([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.jsx?$/)
      ),
    }, {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),*/
]);

module.exports = webpackConfigCommon;
