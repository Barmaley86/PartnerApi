var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const path = require('path');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig,{
    devtool: false,

    output: {
        path: helpers.root('dist'),
        publicPath: './',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
    
        new webpack.LoaderOptionsPlugin({
            minimize :true,
            debug: false
        }),
        // Delete unused JS code
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: true,
            compress: {
              warnings: false, // Suppress uglification warnings
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
              screw_ie8: true
            },
            output: {
              comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
            /*
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },

            comments: false
            */
        }),

        

        // Delete unused CSS styles
        /*
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(helpers.root('src', '**', '*.html')),
        
        }),
        */
        
        // for production
        new webpack.DefinePlugin({ 'process.env': {'ENV': JSON.stringify(ENV)} })
        

    ]
});