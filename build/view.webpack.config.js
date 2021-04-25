const path = require("path");

module.exports = {
  entry: path.join(__dirname, "../views", "index.tsx"),
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
  },
  devtool: "source-map",
  watchOptions: {
    ignored: ["src/**", "**/node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader" }],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist/views"),
  },
};
