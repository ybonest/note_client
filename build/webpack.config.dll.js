const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    react: ['react','react-dom', 'react-router-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, '../dll'),
    library: '_dll_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',  // 此处必须和library对
      path: path.join(__dirname, '../dll', '[name].manifest.json'),
      context: __dirname
    })
  ]
}