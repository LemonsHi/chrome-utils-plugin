// webpack.config.js
/** @type {import('webpack').Configuration} */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : false,

  entry: {
    sidepanel: path.resolve(__dirname, 'src/index.tsx'),
    background: path.resolve(__dirname, 'src/background.ts'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: { '@primary-color': '#1677ff' },
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      vs: 'monaco-editor/esm/vs',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/sidepanel.html',
      filename: 'sidepanel.html',
      chunks: ['sidepanel'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.json', to: '.' },
        {
          from: path.dirname(require.resolve('monaco-editor/min/vs/loader.js')),
          to: 'monaco/min/vs',
          globOptions: {
            ignore: ['**/tsWorker.js'], // 忽略 .map 文件
          },
        },
        {
          from: path.resolve(__dirname, 'public'),
          to: '.',
          globOptions: {
            ignore: ['**/sidepanel.html'], // ← 排除冲突文件
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    isDev && new ReactRefreshPlugin(),
    new MonacoWebpackPlugin({
      languages: ['json'], // 只打包需要的语言，体积更小
      filename: 'monaco/[name].worker.js', // 输出到 dist/monaco
    }),
  ].filter(Boolean),

  devServer: {
    hot: true,
    // ★ 1. 告诉 dev-server：根路径就返回 sidepanel.html
    devMiddleware: { index: 'sidepanel.html' },
    // ★ 2. （可选）启动时自动用浏览器打开正确页面
    open: ['/sidepanel.html'],
  },
};
