const { merge } = require('webpack-merge');
const path = require('path')
const config = require('./webpack.config');

module.exports = merge(config, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.js',
        clean:true
    }
});