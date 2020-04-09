const path = require('path')
const config = require('../basic-config/env.config')
const babelConfig = require('./babelConfig')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const MiniCSSPlugin = require('mini-css-extract-plugin'); // mini-css-extract-plugin(webpack@4) 替代 extract-text-webpack-plugin(webpack@3)

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins(/*loader*/) {
      return [
        require('autoprefixer')(),
        require('cssnano')({
          zindex: false,
          reduceIdents: false
        })
      ]
    }
  }
}

const babelBase = isDev => {
  let rules = [
    {
      test: /\.jsx?$/,
      exclude: [
        config.PATH.projectNodeModules
      ],// 屏蔽不需要处理的文件（文件夹）（可选）
      include: [
        config.PATH.frontend
      ],
      loader: 'babel-loader',
      options: Object.assign({
        cacheDirectory: true
      }, babelConfig)
      // options: {
      //
      //     presets: ['es2015', 'stage-0', 'react'],
      //     cacheDirectory: true,
      //     plugins: [
      //         'transform-decorators-legacy',
      //         'transform-object-rest-spread',
      //         'transform-class-properties',
      //         [
      //             'transform-runtime',
      //             {
      //                 "polyfill": false
      //             }
      //         ],
      //         'react-hot-loader/babel'
      //     ]
      // },
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'images/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.css$/,
      exclude: [
        /\.mod\.css$/,
        /\.use(able)?\.css$/
      ],
      use: [
        {
          loader: MiniCSSPlugin.loader,
          options: {
            hmr: isDev
          }
        },
        {loader: 'css-loader', options: {minimize: !isDev}},
        postcssLoader
      ],
      // use: ExtractTextWebpackPlugin.extract({
      //   use: [
      //     {loader: 'css-loader', options: {minimize: !isDev}},
      //     postcssLoader
      //   ],
      //   fallback: 'style-loader'
      // })
      // use: [
      //   {loader: 'style-loader'},
      //   {
      //     loader: 'css-loader',
      //     options: {
      //       modules: true,
      //       localIdentName: '[path][name]__[local]--[hash:base64:5]'
      //     }
      //   }
      // ]
    },
    {
      test: /\.use(able)?\.css/,
      use: [
        {loader: 'style-loader/useable'},
        {loader: 'css-loader', options: {minimize: !isDev}},
        postcssLoader,
        {loader: 'less-loader'}
      ]
    },
    {
      test: /\.less$/,
      exclude: [
        /\.mod\.less/,
        /\.use(able)?\.less$/
      ],
      use: [
        {
          loader: MiniCSSPlugin.loader,
          options: {
            hmr: isDev
          }
        },
        {loader: 'css-loader', options: {minimize: !isDev}},
        postcssLoader,
        {loader: 'less-loader'}
      ],
      // use: ExtractTextPlugin.extract({
      //   use: [
      //     { loader: 'css-loader', options: { minimize: !isDev } },
      //     postcssLoader,
      //     { loader: 'less-loader' }
      //   ],
      //   fallback: 'style-loader'
      // })
      // use: [
      //   {loader: 'style-loader'},
      //   {
      //     loader: 'css-loader',
      //     options: {
      //       modules: true,
      //       localIdentName: '[path][name]__[local]--[hash:base64:5]'
      //     }
      //   },
      //   {
      //     loader: 'less-loader',
      //     options: {
      //       modules: true,
      //       localIdentName: '[path][name]__[local]--[hash:base64:5]'
      //     }
      //   }
      // ]
    },
    {
      test: /\.use(able)?\.less$/,
      use: [
        {loader: 'style-loader/useable'},
        {loader: 'css-loader', options: {minimize: !isDev}},
        postcssLoader,
        {loader: 'less-loader'}
      ]
    },
  ];

  return rules;
};

// console.log(babelBase.rules[0].options);
module.exports = isDev => babelBase(isDev);
