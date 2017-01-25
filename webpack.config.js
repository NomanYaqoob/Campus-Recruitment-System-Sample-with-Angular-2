var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
  devtool: 'source-map',
  debug: true,
  entry: ['./app/config/main.ts'],
  output: {
    path: './dist',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: 'node_modules' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'raw' },
      { test: /\.scss$/, loaders: ['raw', 'sass'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css', '.scss', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'app/assets', to: 'assets' }
    ]),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Hammer: "hammerjs/hammer"
    })
  ],
  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'app'
  },
  devServer: {
    port: 2000,
    host: 'localhost'
  }
}
