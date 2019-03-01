const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { DefinePlugin } = require('webpack')

const config = {
  target: 'node',
  entry: './index',
  context: path.resolve(__dirname),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      { test: /\.json$/, loader: 'json-loader' },
	  { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader'}     
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: ['.js', '.json']
  }
}

config.externals = [nodeExternals()]

module.exports = config
