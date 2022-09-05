const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),//入口问文件

  output: {
    filename: 'static/js/[name].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },

  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: 'babel-loader',
          options: {
            // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /.(css|less)$/, //匹配 css和less 文件
        use: [
          'style-loader',
          'css-loader',
          // {
          //postcss-loader：处理css时自动加前缀
          // autoprefixer：决定添加哪些浏览器前缀到css中
          //.browserslistrc文件配置哪些浏览器需要加前缀
          //postcss.config.js postcss-loader的配置文件
          //   loader: 'postcss-loader',//兼容css3语法 低版本浏览器 借助插件自动加前缀
          //   options: {
          //     postcssOptions: {
          // plugins: ['autoprefixer']   //此配置可写在postcss.config.js
          //     }
          //   }
          // },
          'postcss-loader',
          'less-loader'
        ]
      },

      {
        // babel-loader: 使用 babel 加载最新js代码并将其转换为 ES5
        // @babel/corer: babel 编译的核心包
        // @babel/preset-env: babel 编译的预设,可以转换目前最新的js标准语法
        // core-js: 使用低版本js语法模拟高版本的库, 也就是垫片

        test: /.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
            presets: [
              [
                "@babel/preset-env",
                {
                  // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                  // "targets": {
                  //  "chrome": 35,
                  //  "ie": 9
                  // },
                  "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                  "corejs": 3, // 配置使用core-js低版本
                }
              ],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      }

    ]
  },

  resolve: {
    extensions: ['.js', '.tsx', '.ts'], //是webpack的resolve解析配置下的选项，在引入模块时不带文件后缀时，会来该配置数组里面依次添加后缀查找文件
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),

    // 配置环境变量BASE_ENV
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ]

}