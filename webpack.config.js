var webpack = require('webpack');
var path = require('path');

const BUILD_DIR = path.resolve(__dirname, './priv/assets/js');
const APP_DIR = path.resolve(__dirname, './client');

const MinifyPlugin = require("babel-minify-webpack-plugin");

// e.g: Run `$ PROD_ENV=1 webpack` to enable this.
const isProduction = JSON.parse(process.env.PROD_ENV || '0');


var plugins = [];

if(isProduction) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })
    );
}

const config = {
    entry: APP_DIR + '/js/app.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'app.js',
        publicPath: '/assets/js/'
    },
    devtool: 'source-map',
    module : {
        loaders : [
            {
                enforce: 'pre',
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: ['eslint-loader']
            },
            {
                test : /\.jsx?/,
                include : APP_DIR + '/js',
                loader : 'babel-loader'
            },
            {
                test: /\.pug$/,
                include : APP_DIR + '/pug',
                loaders: ['file-loader?name=../../[name].html', 'pug-html-loader?compressed&exports=false']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins: plugins
};



module.exports = config;
