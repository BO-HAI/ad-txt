const PATH = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'index': './src/js/index.js',
        'jq': './src/js/jquery/1.11.0.js',
        'colors': './src/js/colorpicker-master/colors.js',
        'colorpicker_data': './src/js/colorpicker-master/colorpicker.data.js',
        'colorpicker': './src/js/colorpicker-master/colorpicker.js',
        'jscolor': './src/js/colorpicker-master/javascript_implementation/jscolor.js',
        'handlebars': 'handlebars/dist/handlebars.js'
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
                   'src/js/colorPicker-master/',
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
                            limit: 500,
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
            },
            {
                test: /\.handlebars$/,
                loader: "handlebars-loader?helperDirs[]=" + __dirname + "/src/js/helper"
            },
            {
                test: /\.json$/,
                use: 'json-loader'
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
            chunks: ['jq', 'handlebars', 'colors', 'colorpicker_data', 'colorpicker', 'jscolor', 'index'],
            // chunks: ['jq', 'colpick', 'colpick_plugin', 'index', 'index2'],
            template: 'src/template/index.html',
            chunksSortMode: 'manual'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        })
    ]
}
