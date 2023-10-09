import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('webpack').Configuration} */
const config = {
	mode: "development",
	devtool: false,
	entry: "./src/index.ts",
	output: {
		path: resolve(dirname(fileURLToPath(import.meta.url)), "dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.ts(x)?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
};

export default config;
