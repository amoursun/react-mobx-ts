import ReactDOM from 'react-dom';
import React from 'react';
import {AppContainer} from 'react-hot-loader'

// 应用文件
import App from './App'

const render = App => ReactDOM.render(
  <AppContainer >
    <App />
  </AppContainer >,
  document.getElementById('root')
)

render(App);

// 热更新
if (module.hot) {
  module.hot.accept('./App', () => {
    console.log(require('./App').default);
    render(require('./App').default)
  })
}
