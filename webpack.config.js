var webpack = require('webpack');
var merge = require('webpack-merge');
var validate = require('webpack-validator');

var rootDir = __dirname;

var common = {
    entry: rootDir + '/app.jsx',
    output: {
        path: rootDir,
        filename: 'app.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
};

var config;

switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(common, {
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('production')
                    }
                }),
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
            ]
        });
        break;

    default:
        config = merge(common, {});
        break;
}

module.exports = validate(config);
