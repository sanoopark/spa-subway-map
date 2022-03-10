const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/index.mjs",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            publicPath: "dist/",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".mjs", ".js", ".css"],
    alias: {
      js: path.resolve(__dirname, "src/js/"),
      css: path.resolve(__dirname, "src/css/"),
      images: path.resolve(__dirname, "src/images/"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    open: true,
    hot: true,
  },
};
