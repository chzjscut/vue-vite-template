//import webpack from 'webpack';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = false;

const webpackConfig = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    //main: './examples/index.html',
    //second: './examples/second.html'
    index: ['./js/index.js'],
    //index: ['webpack-hot-middleware/client', './js/index.js'],
    //print: './js/print.js',
    //main: './js/index.js'
  },
  devtool: 'inline-source-map', //不要在生产环境使用
  output: {
    filename: '[name].bundle.js',
    //filename: 'bundle.js',
    path: path.resolve( __dirname, 'dist'),
    publicPath: '/'
    //clean: true
  },
  devServer: {
    //static: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: require.resolve('./src/loaders/hot-css-loader.js'), options: { injectType: "linkTag" } },
          {
            loader: "file-loader",
            // options: {
            //   name: '[name].[ext]',
            //   outputPath: path.resolve( __dirname, 'styles'),
            //   publicPath: path.resolve( __dirname, 'styles')
            // }
          },
        ],
        // loader: require.resolve('./src/loaders/hot-css-loader.js'),
        // options: {
        //   outputPath: 'styles'
        // }
      },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
      // {
      //   test: /\.css$/i,
      //   use: [
      //     { loader: "style-loader", options: { injectType: "linkTag" } },
      //     { loader: "file-loader" },
      //   ]
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: isProduction ? 'production' : 'development'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  // optimization: {
  //   runtimeChunk: 'single',
  // }
}

//webpack(webpackConfig);

module.exports = webpackConfig