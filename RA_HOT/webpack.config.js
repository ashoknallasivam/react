const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { NODE_ENV = 'development' } = process.env;

const outputDirectory = 'dist';
const ROOT = path.resolve(__dirname);
const SRC = path.resolve(ROOT, 'src');

const HASH_TYPE = NODE_ENV === 'production' ? 'chunkhash' : 'hash';

module.exports = {
	
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(SRC, 'client', 'index.js'),
    ].filter(Boolean),
  },
  output: {
    filename: `[name].[${HASH_TYPE}].js`,
    path: path.resolve(ROOT, 'dist', 'client'),
    publicPath: '/',
	filename: 'bundle.js'
  },
	
 
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
              },{
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
              }
        ]
  },
  devServer: {
    port: 3000,
    open: true,
	contentBase: "public",
	historyApiFallback:true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  resolve: {
    modules: [
     path.resolve(__dirname),
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
