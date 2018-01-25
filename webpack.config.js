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


  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      names: ["commons", "manifest"]
    }),

// dynamically create manifest function file with hashed dist files. 
    function() {
      this.plugin("done", function(stats) {
        require('fs').writeFileSync(
          path.join(__dirname, 'dist/loader.js'),
`function loadFile (file, domain) {
  function loadAssets (files) {
    if (files.length == 0) {
      return;
    }
    var assets = ${stats.toJson().assetSByChunkName};
    var url = '/path/to/dist' + assets[files[0]];
    script.async = true;
    script.src = url;
    script.onload = function () {
      loadAssets(files.slice(1));
    } ;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  loadAssets(['manifest', 'commons', files])
}
`
        );
      });
    }

  ],


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