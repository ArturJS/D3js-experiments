const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packages = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
  appSrc: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const common = {
  context: PATHS.appSrc,

  entry: {
    app: './index.js',
    vendor: Object.keys(packages.dependencies)
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  output: {
    path: PATHS.build,
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: PATHS.appSrc
      },

      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: PATHS.appSrc
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'react-hot-loader'
          },
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-1'],
              plugins: ['transform-decorators-legacy', 'transform-class-properties']
            }
          }
        ],
        include: PATHS.appSrc
      },

      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  }
};

//default configuration
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT || 3000
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Kanban app',
        hash: true,
        template: './index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['common', 'vendor'],
        minChunks: 2
      })//,
      //new webpack.optimize.UglifyJsPlugin() //todo: use in production mode
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}
