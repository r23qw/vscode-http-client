const path = require("path");
// eslint-disable-next-line @typescript-eslint/naming-convention
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const config = {
  entry: path.join(__dirname, "../src/views", "index.tsx"),
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, "../src/views", "tsconfig.json"),
      }),
    ],
  },
  devtool: "source-map",
  watchOptions: {
    ignored: ["**/src/extension"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.join(__dirname, "../src/views", "tsconfig.json"),
            },
          },
        ],
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
              modules: {
                localIdentName: "[local]_[hash:base64:5]",
              },
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
    filename: "app.js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [],
};

module.exports = config;
