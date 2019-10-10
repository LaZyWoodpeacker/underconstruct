const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
	entry: './src/index.js',

	output: {
		//filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin({ title: 'CONTDOWN', template: './src/index.html', inlineSource: '.(js|css)$' }), new HtmlWebpackInlineSourcePlugin()],

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			},
			{
				test: /\.ttf$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}]

			},
			{
				test: /.scss$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loader: 'url-loader',

			},
			{
				test: /\.ogg$/,
				loader: 'url-loader',

			},
		]
	},

	devServer: {
		open: false,
		port: 3000
	}
};
