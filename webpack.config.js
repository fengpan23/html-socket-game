module.exports = {
	entry: './public/index.js',
	output: {
		path: __dirname,
		filename: './public/main.min.js'
	},
	resolve:{
		modulesDirectories:[
			'node_modules',
			'bower_components'
		],
	},
	module: {
		loaders: [
			
		]
	}
}