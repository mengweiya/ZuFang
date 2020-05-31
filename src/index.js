import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 引入ant-design样式----按需引入到组件内,就不需要在全局引用了
// import 'antd-mobile/dist/antd-mobile.css';

import './assets/fonts/iconfont.css'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
