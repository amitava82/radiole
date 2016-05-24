var webpack = require('webpack');
var path = require('path');

var projectRoot = process.env.PWD; // Absolute path to the project root
var resolveRoot = path.join(projectRoot, 'node_modules'); // project root/node_modules
var publicPath = './build/public';


var envPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEVELOP || 'true')),
    __PROD__: JSON.stringify(JSON.parse(process.env.PRODUCTION || 'true')),
    __CLIENT__: true,
    __SERVER__: false
});

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js');
var env = new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')});

var plugins = [commonsPlugin];

if(process.env.NODE_ENV == 'production'){
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false }
    }));
    plugins.push(env);
}

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'client/scripts/client.js'),
        vendors: ['react', 'react-router', 'superagent', 'redux-thunk', 'history', 'lodash', 'scroll-behavior', 'classnames',
            'redux', 'bluebird', 'autobind-decorator', 'react-router-redux', 'react-bootstrap', 'react-router-bootstrap', 'react-helmet','react-g-analytics']
    },
    //devtool: 'source-map',
    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: publicPath,
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [resolveRoot],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', "stage-1", 'react'],
                    plugins: ["transform-decorators-legacy"]
                }
            }
        ]
    },
    resolve: {
        root: [
            resolveRoot,
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.json']
    },
    plugins: plugins,
    modulesDirectories: [
        'node_modules'
    ]
};
