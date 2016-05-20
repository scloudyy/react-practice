const webpack = require('webpack');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const path = require('path');

const parts = require('./lib/parts');

const PATHS = {
	app: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'build')
};

const common = {
	entry: [
		PATHS.app
	],
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['react-hot','jsx?harmony'],
			exclude: /node_modules/
		}]
	},
	plugins: []
};

var config;

switch (process.env.npm_lifecycle_event) {

	case 'start':
		config = merge(
			common,
			parts.devServer({
				// Customize host/port here if needed
				host: process.env.HOST,
				port: 8080
			}),
			parts.setupCSS(path.join(PATHS.app, 'style'))
		);
		break;
	case 'build':
	default:
		config = merge(
			common,
			parts.setupCSS(path.join(PATHS.app, 'style')),
			{devtool: 'source-map'}
		);
		break;
}

module.exports = validate(config);