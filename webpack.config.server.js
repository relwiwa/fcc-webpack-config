/*  Webpack configuration for server-side rendering
    adapted from Stephen Grider's Udemy course about
    SSR a React and Redux application */

const webpackMerge = require('webpack-merge');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const webpackConfigCommon = require('./webpack.config.common');

const webpackConfigServer = webpackMerge([
  {
    target: 'node',
    mode: 'production',
    entry: './express-server/server.js',

    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, '../', 'express-server', 'build-server'),
    },

    /*  prevents webpack from packing imported libraries into
        the bundle on the server */
    externals: [webpackNodeExternals()],

    /* ignore all files but javascript when processing files on the server */
    module: {
      rules: [
        {
          test: /\.s?css$/,
          loader: 'ignore-loader',
        },
      ],
    },
  },
]);

const webpackConfigMerged = webpackMerge(webpackConfigCommon, webpackConfigServer);
webpackConfigMerged.plugins = [];
module.exports = webpackConfigMerged;
