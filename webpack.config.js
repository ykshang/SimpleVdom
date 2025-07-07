const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  cache: {
    type: "filesystem",
  },
  output: {
    clean: true,
    publicPath: "/xuni/",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: "www",
    port: 8090,
    liveReload: true,
    hot: true,
  },
};
