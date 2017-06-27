'use strict';

let webpack = require('webpack');
let path = require('path');
let BUILD_DIR = path.resolve(__dirname, 'dist');
let APP_DIR = path.resolve(__dirname, 'src');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './frontend/src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader',
                options: {
                    presets: [ 'es2015','react' ]
                }
            }
        ]
    }
};

module.exports = config;
