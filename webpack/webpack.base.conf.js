const path = require('path');
const currentExecPath = process.cwd();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevEnv = process.env.NODE_ENV !== 'production';

const sourceBabelOptions = {
  cacheDirectory: true,
  cacheCompression: false,
  presets: [
    // 当前ES版本
    '@babel/preset-env',
    // 增加React(JSX)支持
    '@babel/preset-react',
  ],
  plugins: [
    // 代码转换配置
    ['@babel/plugin-transform-runtime', {
      corejs: false, // 不使用corejs
      helpers: true, // helpers行内转义
      regenerator: true, // 使用function*转义
      useESModules: true, // 模块导出转为export default
    }],
    // 类属性配置
    '@babel/plugin-proposal-class-properties'
  ],
};

const externalBabelOptions = {
  cacheDirectory: true,
  cacheCompression: false,
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry',
      corejs: 3, // 指定使用core-js3
      modules: false, // 不转化ES6模块导出规则
      exclude: ['@babel/plugin-transform-typeof-symbol'],
    }],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      corejs: false,
      helpers: true,
      regenerator: true,
      useESModules: true,
    }],
  ],
};

module.exports = {
  // 打包入口地址
  entry: { main: path.resolve(currentExecPath, './src/index.js') },
  // 打包规则
  module: {
    // 若文件中缺少exports直接报错
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          // 项目源码的babel配置
          {
            test: /\.(js|jsx)$/,
            include: path.resolve(currentExecPath, './src'),
            loader: 'babel-loader',
            options: sourceBabelOptions
          },
          // node_modules等外部代码的babel配置
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            loader: 'babel-loader',
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            options: externalBabelOptions
          },
          // style配置
          {
            test: /\.(sa|sc|c)ss$/,
            exclude: /\.module\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: isDevEnv,
                  reloadAll: true,
                },
              },
              'css-loader',
              'sass-loader'
            ],
          },
          // 静态资源配置
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
          },
        ],
      }
    ]
  },
  // 处理代码分包
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: 'single',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.mjs', '.ts', '.json']
  },
};