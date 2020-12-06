const minifyJS = require("terser-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
	entry: {
		"wmap": "./app.js",
		"wmap.min": "./app.js"
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js"
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	},
	optimization: {
		minimize: true,
		minimizer: [new minifyJS({
			test: /\.min\.js$/i,
		})]
	},
}