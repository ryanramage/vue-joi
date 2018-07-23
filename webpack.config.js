var webpack = require('webpack')

module.exports = {
  entry: './demo/main.js',
  output: {
    path: './demo/build',
    publicPath: '/demo/build/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  // most of the time we don't want this bloat
  node: {
    crypto: 'empty',
    net: 'empty',
    dns: 'empty'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.json', '.js'],
    alias: {
      joi: 'joi-browser'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
