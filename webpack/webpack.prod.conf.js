const webpack = require('webpack');
const ProdWebpackConfigs = require('./build.conf').prod;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBaseConfigs = require('./webpack.base.conf');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = Object.assign({}, WebpackBaseConfigs, {
  mode: 'production',
  output: {
    path: ProdWebpackConfigs.outputPath,
    filename: ProdWebpackConfigs.outputFile,
    chunkFilename: ProdWebpackConfigs.outputChunkFile,
    publicPath: ProdWebpackConfigs.publicPath,
  },
  plugins: [
    // 抽离CSS插件
    new MiniCssExtractPlugin({
      filename: ProdWebpackConfigs.cssFile,
      chunkFilename: ProdWebpackConfigs.cssChunkFile,
    }),
    // 对模块进行Hash插件 - 用于缓存没有修改过的模块
    new webpack.HashedModuleIdsPlugin(),
    // 构造Html插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: ProdWebpackConfigs.templeteIndexFile,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // Gzip压缩插件
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240, // 大于10K的资源会被gzip
      minRatio: 0.8,
    }),
  ],
  optimization: {
    ...WebpackBaseConfigs.optimization,
    minimize: true,
    namedChunks: ProdWebpackConfigs.namedChunks,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // 使用多核加快打包速度
        cache: true, // 使用cache加快打包速度
        sourceMap: ProdWebpackConfigs.isUseSourceMap, // sourceMap
        extractComments: false, // 移除LISENCE的注释
        terserOptions: {
          compress: {
            comparisons: false, // 关闭此项可以避免很多逻辑BUG
          },
          output: {
            comments: false, // 移除注释
            ascii_only: true, // 移除不规范的字符
          },
        },
      }),
      new OptimizeCssAssetsWebpackPlugin(), // 混淆CSS插件
    ],
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 1048576, // 入口需要大于1M才警告
    maxAssetSize: 524288, // 资源需要大于0.5M才警告
    assetFilter(assetFilename) {
      return !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename);
    },
  },
});