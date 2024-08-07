const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    entry: '/src/index.js',
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
              //Creates 'style' nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJs
              'css-loader',
              // Compiles Sass to CS5
              'sass-loader',
            ]
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ],
    },
    watch: true,
    devtool: false   
}