const path = require('path');
const webpack = require('webpack');
const portfinder = require('portfinder');
const notifier = require('node-notifier');
const DevWebpackConfigs = require('./build.conf').dev;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBaseConfigs = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const onErrors = (severity, errors) => {
  if (severity !== 'error') {
    return;
  }

  const error = errors[0]
  const filename = error.file && error.file.split('!').pop()

  notifier.notify({
    title: 'DZCli For Normal',
    message: severity + ': ' + error.name,
    subtitle: filename || '',
    icon: path.join(process.cwd(), './webpack/logo.png')
  });
};

const configs = Object.assign({}, WebpackBaseConfigs, {
  mode: 'development',
  devtool: DevWebpackConfigs.devTool,
  output: {
    path: DevWebpackConfigs.outputPath,
    filename: DevWebpackConfigs.outputFile,
    chunkFilename: DevWebpackConfigs.outputChunkFile,
    publicPath: DevWebpackConfigs.publicPath,
  },
  plugins: [
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),
    // 抽离CSS插件
    new MiniCssExtractPlugin({
      filename: DevWebpackConfigs.cssFile,
      chunkFilename: DevWebpackConfigs.cssChunkFile,
    }),
    // 构造Html插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: DevWebpackConfigs.templeteIndexFile,
      inject: true,
    }),
  ],
  optimization: {
    ...WebpackBaseConfigs.optimization,
    noEmitOnErrors: true, // 防止报错导致webpack终止
    namedChunks: DevWebpackConfigs.namedChunks, // 固定chunks的id
  },
  devServer: {
    hot: true,
    quiet: true,
    compress: true,
    contentBase: false,
    clientLogLevel: 'warn',
    host: DevWebpackConfigs.host,
    port: DevWebpackConfigs.port,
    open: DevWebpackConfigs.autoOpen,
    headers: { 'Access-Control-Allow-Origin': '*' },
    overlay: { warnings: false, errors: true },
    publicPath: DevWebpackConfigs.publicPath,
    historyApiFallback: { rewrites: [{ from: /.*/, to: '/index.html' }] }
  },
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 8123;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      configs.devServer.port = port;
      configs.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${configs.devServer.host}:${port}`],
        },
        onErrors
      }));
      resolve(configs);
    }
  })
});