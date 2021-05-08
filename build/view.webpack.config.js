const path = require("path");

const config = {
  entry: path.join(__dirname, "../src/views", "index.tsx"),
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: "source-map",
  watchOptions: {
    ignored: ["**/src/extension"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.module\.css$/,
        include: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist/views"),
  },
  plugins: [],
};

module.exports = config;
