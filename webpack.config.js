var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new ExtractTextPlugin('bundle.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      }, 
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass', 'sass-bulk-import'],
        //loader: ExtractTextPlugin.extract('style', 'css', 'sass', 'sass-bulk-import')
      },
      {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, 
        loader: 'url-loader?limit=100000' 
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./node_modules/compass-mixins/lib")]
  },
};
