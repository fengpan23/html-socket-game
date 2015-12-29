var path = require('path');
module.exports = {
	entry: './public/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'main.min.js'
	},
	resolve:{
		modulesDirectories:[
			'node_modules',
			'bower_components'
		],
	},
	module: {
		loaders: [
			{test: /\.jsx$/, loader: 'msx-loader'},
			{test: /\.css$/, loader: "style-loader!css-loader" },
			{test: /\.png$|\.woff/, loader: "url-loader?limit=100000" },
			{test: /\.jpg$|\.eot|\.ttf/, loader: "file-loader" },
		]
	}
}