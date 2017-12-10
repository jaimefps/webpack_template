const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    // file where ReactDOM.render() happens:
    index: './path/to/index.js',
  },
  resolve : {
    // examples of folders with files imported into client code:
    modules: ['node_modules', 'folder', 'folder'],
    // file types:
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    // folder to serve from when `npm start`:
    contentBase: './public',
    port: 9000
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  }
}