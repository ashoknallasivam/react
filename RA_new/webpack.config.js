const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const { NODE_ENV = 'development' } = process.env;
const ROOT = resolve(__dirname);
const SRC = resolve(ROOT, 'src');
const VENDORS = [
  'react',
  'react-dom',
  'axios',
  'lodash.times',
  'semantic-ui-react',
];
const HASH_TYPE = NODE_ENV === 'production' ? 'chunkhash' : 'hash';

const onlyIn = env => plugin =>
  NODE_ENV === env ? plugin : null;
const onlyInDev = onlyIn('development');
const onlyInProd = onlyIn('production');

module.exports = {
  devtool: NODE_ENV !== 'production' ? 'cheap-module-eval-source-map' : false,
  entry: {
    app: [
      onlyInDev('react-hot-loader/patch'),
      onlyInDev('webpack-hot-middleware/client'),
      resolve(SRC, 'client', 'index.js'),
    ].filter(Boolean),
    vendors: VENDORS,
  },
  output: {
    filename: `[name].[${HASH_TYPE}].js`,
    path: resolve(ROOT, 'dist', 'client'),
    publicPath: '/',
  },
  target: 'web',
  module: {
    rules: [
            {
                test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader'
                
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
              },
			  
			  
			  
			  {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                use: [
                  {
                    loader:  'url-loader',
                    options: {
                      limit: 100000,
                      publicPath: '/public/assets/',
                      name: '[name].[ext]'
                    }
                  }
                ]
              },
    ],
  },
  resolve: {
    modules: [
      resolve(__dirname),
      "node_modules"
    ],
    extensions: [".json", ".js", ".jsx"],
    alias: {
        stringUtil: "src/client/utils/stringUtil",
        arrayUtil: "src/client/utils/arrayUtil",
        arrayUtil: "src/client/utils/arrayUtil",       
        appConstants:"src/client/constants/appConstants",
        actionTypes:"src/client/constants/actionTypes"
    }
  },
  optimization: {
	  
    splitChunks: {
        cacheGroups: {
            default: false,
            vendors: false,

            // vendor chunk
            vendor: {
                // sync + async chunks
                chunks: 'all',

                // import file path containing node_modules
                test: /node_modules/
            }
        }
    },
	minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
	
 },
  
  
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve( 'public', 'index.html'),
	  favicon: './public/favicon.ico'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new ExtractTextPlugin({
      filename: 'styles.[contenthash].css',
      allChunks: true,
      disable: NODE_ENV !== 'production',
    }),
    onlyInDev(new webpack.HotModuleReplacementPlugin()),
    onlyInDev(new webpack.NoEmitOnErrorsPlugin()),
    onlyInDev(new webpack.NamedModulesPlugin()),
  ].filter(Boolean),
};
