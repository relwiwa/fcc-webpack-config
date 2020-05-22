const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const purgecss = require('@fullhuman/postcss-purgecss');
//const BabelMinifyPlugin = require('babel-minify-webpack-plugin');

module.exports.autoprefixCSS = ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      autoprefixer,
    ]),
  },
});

module.exports.removeUnusedCSS = ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      purgecss({
        content: [
          './react-client/**/*.html',
          './react-client/**/*.jsx',
          './react-client/**/*.tsx',
          './react-client/**/*.js',
          './react-client/**/*.ts'
        ],
        whitelistPatterns: [/^flag-/],
      }),
    ]),
  },
});

module.exports.devServer = () => ({
  devServer: {
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

  
  /*module.exports.lintJavascript = ({ include, exclude, options } = {}) => ({
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'eslint-loader',
          enforce: 'pre',
          include,
          exclude,
          options,
        },
      ],
    },
  });*/
  
module.exports.loadAudio = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(mp3|ogg|wav)$/,
        exclude,
        include,
        use: [
          {
            loader: 'file-loader',
            options,
          },
        ],
      },
    ],
  },
});
  
module.exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude,
        include,
        use: [
          {
            loader: 'url-loader',
            options,
          },
          'image-webpack-loader',
        ],
      },
    ],
  },
});
  
module.exports.loadJavascript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [["@babel/preset-env", { "modules": false }], "@babel/preset-react"],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-object-rest-spread"
            ],
            env: {
              test: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
              },
            },
          },
        }],
        exclude,
        include,
      },
    ],
  },
});

module.exports.loadTypescript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
        }],
        exclude,
        include,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
});


module.exports.loadStyles = ({ include, exclude, use } = {}) => {
  return {
    module: {
      rules: [{
          test: /\.s?css$/,
          include,
          exclude,
          use,
      }],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    ],
  };
};

module.exports.minifyCSS = () => ({
  plugins: [
    /*  - optimize-css-assets-webpack-plugin is a plugin based option that applies
    a chosen minifier on CSS assets. Using ExtractTextPlugin can lead to duplicated
    CSS given it only merges text chunks. OptimizeCSSAssetsPlugin avoids this
    problem by operating on the generated result and thus can lead to a better
    result.
    - it removes duplicate css rules */
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
//        safe: true,
      },
      canPrint: true,
    }),
  ],
});

/*  - Minification is enabled with -p or --optimize-minimize options, but then,
      UglifyJsPlugin is used, that cannot yet handle ES6)
    - It cannot yet handle ES6, so BabelMinifyWebpackPlugin is used instead */
/*module.exports.minifyJavascript = () => ({
  plugins: [
    new BabelMinifyPlugin(),
  ],
});*/

/*module.exports.setGlobalConstants = (globalConstants = {}) => ({
  plugins: [
    new webpack.DefinePlugin(globalConstants),
  ],
});*/
