
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');
const { rulesPackFn } = require('./app.config.js');
const happyThreadPool = HappyPack.ThreadPool({size: 3});
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    '../src/main.js',
  ],
  mode: 'development',
  output:{
    path: path.join(__dirname, './dist'),
    filename: `[name]_[hash:8].js`,
    chunkFilename: `[name]_[chunkhash:8].js`,
    publicPath: '/'
  },
  plugins: [
    ...happyPackPlugins,
    new HtmlPlugin({
      hash: false, template: '../src/index.html', env:'development'
    }),
    new webpack.HotModuleReplacementPlugin(),  // 与'webpack/hot/only-dev-server'对应
    new MiniCssExtractPlugin({
      filename: '[name]_[hash].css',
      chunkFilename: '[name]_[chunkhash:8].css'
    })
  ],
  module: {
    rules
  },
  resolve: {
    extensions: ['.js', '.jsx', 'scss', 'css'],
    alias
  },
  // devtool: 'source-map'
}

module.exports = config;