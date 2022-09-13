const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化

    plugins: [
        // 复制文件插件
        // public文件一般为静态资源可直接绝对逻辑狗映入不需要解释直接放进构件文件中
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'), // 复制public下文件
                    to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
                    filter: source => {
                        return !source.includes('index.html') // 忽略index.html
                    }
                },
            ],
        }),

        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css' // 抽离css的输出目录和名称
          }),
    ],

    optimization: {
        minimizer: [
          new CssMinimizerPlugin(), // 压缩css

        //   webpack会使用内置插件terser-webpack-plugin压缩js文件,
        // 该插件默认支持多线程压缩,但是上面
        // 配置optimization.minimizer压缩css后,js压缩就失效了
          new TerserPlugin({ // 压缩js
            parallel: true, // 开启多线程压缩
            terserOptions: {
              compress: {
                pure_funcs: ["console.log"] // 删除console.log
              }
            }
          }),
        ],
    },
})