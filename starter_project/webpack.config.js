const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: "./src/client/index.js", // Entry point of the application
  mode: "development", // or 'production'
  module: {
    rules: [
      {
        test: /\.js$/, // Regex to match JavaScript files
        exclude: /node_modules/, // Exclude the node_modules directory
        loader: "babel-loader", // Use babel-loader to transpile JavaScript files
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
  ],
};
