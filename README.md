# webpack
webpack dev prod 学习

## 特点

- webpack 一个适用于真实项目开发配置
- Router 做了基本权限处理，跳转，以及一个更好的组织项目模块的路由配置函数
- mobx 处理数据流，简单易用
- axios 基于模块组织 api 接口
- 基于路由和组件的按需加载模块
- 业务场景模块抽离
- 多模块, 多入口

## 技术栈

- react 16.8.x
- react-dom
- react-router-dom 5.xx
- react-loadable
- mobx 数据流
- webpack 4.xx
- axios 异步请求
- antd ui
- mock 模拟接口数据
- echarts

## 开发环境

- git clone https://github.com/ganyanlins/webpack.git
- npm i -dd
- npm run dll 构建依赖资源
- npm run dev 开发环境启动

## 生产环境

- npm run prod(不会构建dll) || npm run build (会重新构建所有)
