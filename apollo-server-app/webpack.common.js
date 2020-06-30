const path = require('path');

module.exports = {
  entry: [path.join(__dirname, "./src/server.ts")],
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".mjs", ".js", "json"]
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist")
  }
};
