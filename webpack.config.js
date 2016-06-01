var webpack = require('webpack'),
    merge = require('webpack-merge'),
    validate = require('webpack-validator'),
    rootDir = __dirname,
    common, config;

common = {
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
