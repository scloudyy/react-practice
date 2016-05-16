const webpack = require('webpack');

var config = {
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:3000', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./src/index.js' // Your appʼs entry point
	],
	output: {
		path: __dirname + '/src/public/',
		filename: 'bundle.js',
		publicPath: '/src/public/'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.jsx?$/,
			loaders: ['react-hot', 'jsx?harmony'],
			exclude: /node_modules/
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};

module.exports = config;