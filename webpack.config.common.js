const HtmlWebpackPlugin = require('html-webpack-plugin');
const minimist = require('minimist');
const path = require('path');

const webpackMerge = require('webpack-merge');
const webpackParts = require('./webpack.parts');

/*  this allows projects to be called like this from command line:
    npm run serve:project -- --project=life */
const argv = minimist(process.argv.slice(2));

const webpackConfigCommon = webpackMerge([
  {
    entry: `${argv.projectpath}/${argv.project}`,
    output: {
      filename: '[name].[chunkhash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../', 'react-client', 'index.html'),
      }),
    ],
  },
  webpackParts.loadJavascript({ exclude: /node_modules/ }),
  webpackParts.loadTypescript({ exclude: /node_modules/ }),
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
