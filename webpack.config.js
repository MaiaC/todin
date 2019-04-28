const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  // devtool: 'eval-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[{
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      }]
  },
};