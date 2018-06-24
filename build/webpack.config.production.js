
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
    vendor: [
      'react', 'react-dom', 'react-router-dom'
    ],
    app: ['./src/main.js']
  },
  devtool: 'cheap-module-source-map',
  output:{
    path: path.join(__dirname, '../dist'),
    filename: `[name]_[hash:8].js`,
    chunkFilename: `[name]_[chunkhash:8].js`,
    publicPath: './'
  },
  plugins: [
    ...happyPackPlugins,
    new HtmlPlugin({
      hash: false,
      template: './src/index.html',
      filename: path.join(__dirname, `../dist/index.html`),
      chunks: ['vendor', 'common_vendor'],  // 当entry有多个入口文件时，与entry对象的键对应，使对应的html文件只注入需要的js
      minify: { // 指定 生成的 index.html 的压缩选项
        collapseWhitespace: true,  // 合并空白字符
        removeComments: true, // 把所有的注释删除掉
        removeAttributeQuotes: true // 移除属性上的引号
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name]_[hash].css',
      chunkFilename: '[name]_[chunkhash:8].css'
    }),
    new ParallelUglifyPlugin({  //压缩js
      uglifyJS: {
        output: {
          comments: false
        }
      },
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
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