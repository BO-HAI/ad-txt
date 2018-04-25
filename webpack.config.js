const PATH = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'index': './src/js/index.js',
        'index2': './src/js/index2.js',
        'colpick': './src/js/color_picker/js/colpick.js',
        'colpick_plugin': './src/js/color_picker/js/plugin.js',
        'jq': './src/js/jquery/1.11.0.js'
    },
    output: {
        filename: './js/[name].js',
        path: PATH.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: [
                   'src/js/color_picker/js/*.js',
                   'src/js/jquery/'
               ],
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './images'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                          limit: 10000,
                          name: '[name].[ext]',
                          outputPath: './fonts'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: PATH.join(__dirname, "dist"),
        compress: true,
        port: 9001
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            title: 'index',
            filename: 'index.html',
            chunks: ['index', 'index2'],
            // chunks: ['jq', 'colpick', 'colpick_plugin', 'index', 'index2'],
            template: 'src/template/index.html',
            chunksSortMode: 'manual'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    externals: {
        'jquery' : 'window.jQuery'
    }
}
