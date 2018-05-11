const autoprefixer = require('autoprefixer');
//const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
//const cssnano = require('cssnano');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports.autoprefixCSS = ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      autoprefixer,
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

// CommonsChunkPlugin was replaced
// https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
/*module.exports.extractBundleChunks = bundles => ({
  plugins: bundles.map(bundle => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});*/

/*module.exports.extractBundleChunks = {
  optimization: splitChunks,
};*/


/*module.exports.extractSCSS = ({ include, exclude, use } = {}) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    /*  { allChunks: true } is necessary for style files of lazy loaded
    components to be available properly:
    https://medium.com/@sejoker/code-splitting-with-webpack-on-the-
    component-level-ac50748d80de */
    //    allChunks: true,
    /*  });
    
    return {
      module: {
        rules: [
          {
            test: /\.s?css$/,
            include,
            exclude,
            use: plugin.extract({
              use,
            }),
          },
        ],
      },
      plugins: [plugin],
    };
  };*/
  
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
            presets: [["babel-preset-env", { "modules": false }], "react"],
            plugins: [
              "syntax-dynamic-import",
              "transform-object-rest-spread"
            ],
            env: {
              test: {
                presets: ["babel-preset-env", "react"]
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
  };
};

  /*module.exports.minifyCSS = () => ({
    plugins: [
      /*  - optimize-css-assets-webpack-plugin is a plugin based option that applies
      a chosen minifier on CSS assets. Using ExtractTextPlugin can lead to duplicated
      CSS given it only merges text chunks. OptimizeCSSAssetsPlugin avoids this
      problem by operating on the generated result and thus can lead to a better
      result.
      - it removes duplicate css rules */
      /*    new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          safe: true,
        },
      canPrint: true,
    }),
  ],
});*/

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
