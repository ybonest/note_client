
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');
const { rulesPackFn } = require('./app.config.js');
const happyThreadPool = HappyPack.ThreadPool({size: 3});
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const glob = require('glob');

const rulesPack = rulesPackFn(happyThreadPool);

let happyPackPlugins = [];
let rules = [];
rulesPack.forEach(item => {
  const { test, id, loaders, threadPool } = item;
  happyPackPlugins.push(new HappyPack({id, loaders, threadPool}));
  let rule = null;
  switch(id){
    case 'babel':
      rule = {test, use: [`happypack/loader?id=${id}`], exclude: path.join(__dirname, '../node_modules')};
      break;
    case 'css':
    case 'scss':
      rule = {
        test,
        use: [
          MiniCssExtractPlugin.loader,
          `happypack/loader?id=${id}`
        ]
      };
      break;
    default: 
      rule = {test, use: loaders};
  }
  rules.push(rule);
})

const filePath = glob.sync(path.resolve(__dirname,'../src/*'));
let alias = {}
filePath.forEach((file) => {
  const name = file.split(/src\//)[1];
  name !== 'index.html' && name !== 'main.js' && (alias[name] = file);  
})

const config = {
  entry: {
    react: [
      'react', 'react-dom', 'react-router-dom'
    ],
    prismjs: [
      'prismjs'
    ],
    app: ['./src/main.js']
  },
  devtool: 'cheap-module-source-map',
  output:{
    path: path.join(__dirname, '../dist'),
    filename: `[name]_[hash:8].js`,
    chunkFilename: `[name]_[chunkhash:8].js`,
    publicPath: '/'
  },
  plugins: [
    ...happyPackPlugins,
    new HtmlPlugin({
      hash: false,
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]_[hash].css',
      chunkFilename: '[name]_[chunkhash:8].css'
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules
  },
  resolve: {
    extensions: ['.js', '.jsx', 'scss', 'css'],
    alias
  },
  mode: 'production'
}

module.exports = config;