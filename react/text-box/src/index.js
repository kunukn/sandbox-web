import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import './index.css';
import App from 'components/App';
import configureStore from 'store/configureStore';

if (!window.Promise) {
  window.Promise = Promise;
}

console.warn(
  'Remember to run: npm start api',
  'If you are using the mock api server');

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
