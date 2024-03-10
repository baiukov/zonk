const path = require('path')

module.exports = {
	mode: 'development', // or 'production'
	entry: './build/index.js', // entry point of your application
	output: {
		path: path.resolve(__dirname, 'dist'), // output directory
		filename: 'bundle.js' // name of the bundled file
	},
	module: {
		rules: [
			{
				test: /\.js$/, // apply this rule to all .js files
				exclude: /node_modules/, // don't apply to files in node_modules
				use: {
					loader: 'babel-loader', // use babel-loader to transpile ES6+ code
					options: {
						presets: ['@babel/preset-env'] // use @babel/preset-env to convert ES6+ code to ES5
					}
				}
			}
		]
	}
}
