const config = require('./webpack.config.js');
const webpack = require('webpack');
const compiler = webpack(config);
const WebpackDevServer = require('webpack-dev-server');

const server = new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: true,
  proxy: {
    "/api": "http://localhost:3000",
    "/note": "http://localhost:3000",
    "/images": "http://localhost:3000"
  },
  publicPath: '/'
});

server.listen(3001);