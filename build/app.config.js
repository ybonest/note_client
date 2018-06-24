const rulesPackFn = (happyThreadPool) => {
  return  [
    {
      test: /\.css$/,
      id: 'css',
      loaders: [
        { 
          loader: 'css-loader'
        }
      ],
      threadPool: happyThreadPool
    },
    {
      test: /\.scss$/,
      id: 'scss',
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        {
          loader: 'sass-loader',
        }
      ],
      threadPool: happyThreadPool
    },
    {
      test: /\.js|\.jsx$/,
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool
    },
    {
      id: 'img',
      test: /\.(jpe?g|png|gif|svg)(\?.+)?$/,
      loaders: [
        {
          loader: 'file-loader?cacheDirectory=true',
          options: {
            query: {
              name: 'images/[sha512:hash:hex].[ext]'
            }
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: true
            },
            optipng: {
              optimizationLevel: 7
            }
          }
        }
      ],
      threadPool: happyThreadPool
    },
    {
      id: 'font',
      test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
      loaders: [
        {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[hash].[ext]'
          }
        }
      ],
      threadPool: happyThreadPool
    }
  ]
}

module.exports = { rulesPackFn }