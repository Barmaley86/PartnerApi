var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              silent: true,
              configFileName: helpers.root('src', 'tsconfig.json')
            }
          }, 
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ 
          //publicPath: '/',
          fallback: 'style-loader', 
          use: [
            {
              loader: "css-loader",
              options: {
                //sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader?name=assets/[name].[ext]'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist/**'],
      {
        root: helpers.root(),
        verbose:  false,
        dry:      false
      }
    ), 
    
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),

    //Fix for warning
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      helpers.root('src')
    ),    

    new ExtractTextPlugin("[name].css"),

    new CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], minChunks: Infinity}),    

    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: false,
      filename: "./index.html",
    }),
    
  ]
}