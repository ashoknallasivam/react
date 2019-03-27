const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;


const ROOT = path.resolve(__dirname);
const SRC = path.resolve(ROOT, 'src');

const HASH_TYPE = NODE_ENV === 'production' ? 'chunkhash' : 'hash';

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
};

}

module.exports = {
  mode: 'development',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(SRC, 'index.js'),
    ].filter(Boolean),
  },
  output: {
    filename: `[name].[${HASH_TYPE}].js`,
    path: path.resolve(ROOT, 'build'),
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
      '/api': 'http://localhost:4000'
    }
  },
  resolve: {
    modules: [
     path.resolve(__dirname),
      "node_modules"
    ],
    extensions: [".json", ".js", ".jsx"],
    alias: {
        stringUtil: "src/utils/stringUtil",
        arrayUtil: "src/utils/arrayUtil",
        arrayUtil: "src/utils/arrayUtil",       
        appConstants:"src/constants/appConstants",
        actionTypes:"src/constants/actionTypes"
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
	 new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ]
};
