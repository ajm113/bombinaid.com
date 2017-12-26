var webpack = require('webpack');
var path = require('path');

const BUILD_DIR = path.resolve(__dirname, './priv/assets/js');
const APP_DIR = path.resolve(__dirname, './client');

const config = {
    entry: APP_DIR + '/js/app.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'app.js',
        publicPath: '/assets/js/'
    },
    module : {
        loaders : [
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
    }
};



module.exports = config;
