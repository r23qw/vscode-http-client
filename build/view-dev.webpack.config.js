const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./view.webpack.config");
// eslint-disable-next-line @typescript-eslint/naming-convention
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  devServer: {
    contentBase: `${__dirname}/dist`,
    port: 4242,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Http Client",
      templateContent: /*html*/ `
      <html>
        <head>
          <title>Http Client</title>
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
      `,
    }),
    new webpack.DefinePlugin({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "process.env.VSCODE_WEBVIEW": process.env.VSCODE_WEBVIEW,
    }),
  ],
};

module.exports = merge(baseConfig, config);
