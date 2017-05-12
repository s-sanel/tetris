// module.exports = {
//   entry: "./lib/tetris.js",
//   output: {
//   	filename: "./lib/bundle.js"
//   },
//   devtool: 'source-map',
//   resolve: {
//     extensions: ["*",".js"]
//   }
// };

var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/tetris",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", "*"]
  }
};
