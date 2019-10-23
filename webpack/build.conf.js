const path = require('path');
const currentExecPath = process.cwd();

module.exports = {
  dev: {
    port: '8123',
    host: '0.0.0.0',
    autoOpen: true,
    namedChunks: true,
    publicPath: '/',
    outputPath: path.resolve(currentExecPath, './dist'),
    outputFile: 'js/[name].js',
    outputChunkFile: 'js/[id].js',
    cssFile: 'css/[name].css',
    cssChunkFile: 'css/[id].css',
    devTool: 'cheap-module-eval-source-map',
    templeteIndexFile: path.resolve(currentExecPath, 'index.html')
  },
  prod: {
    isUseSourceMap: false,
    namedChunks: true,
    publicPath: '/',
    outputPath: path.resolve(currentExecPath, './dist'),
    outputFile: 'js/[name].[contenthash:8].js',
    outputChunkFile: 'js/[id].[chunkhash:8].js',
    cssFile: 'css/[name].[contenthash:8].css',
    cssChunkFile: 'css/[id].[chunkhash:8].css',
    templeteIndexFile: path.resolve(currentExecPath, 'index.html')
  },
};