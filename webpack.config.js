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
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.jsx?$/,
			loaders: ['jsx?harmony'],
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
				port: 3000
			})
		);
		break;
	case 'build':
	default:
		config = merge(common, {});
		break;
}

module.exports = validate(config);