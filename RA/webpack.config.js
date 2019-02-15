var debug = process.env.NODE_ENV !== "production"; 

var webpack  = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');
const indexFile = path.resolve(__dirname, 'src/index.js');

var config = {
    entry: indexFile,
    externals: {
        'configuration': JSON.stringify(require('./config.dev.js'))
      },
    output: {
        path: BUILD_DIR ,
        filename: 'bundle.js'
    },
    devtool: debug ? "source-map" : null,
    target: 'web',
    module: {
        loaders: [
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
    }, devServer: {
        port: 5000,
        contentBase: BUILD_DIR,
        historyApiFallback:true
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
        rootComponentReducer:"src/components/rootcomponentReducer",
        appConstants:"src/constants/appConstants",
        actionTypes:"src/constants/actionTypes"
    }
  },
    plugins: debug ? [
        new HtmlWebpackPlugin({
          title: 'Rapter Admin',
          template: path.resolve(__dirname, 'public/index.ejs')
        })
      ] : [ 
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
      ] 
};

module.exports = config;