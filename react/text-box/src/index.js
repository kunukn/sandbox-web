import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Promise from 'promise-polyfill'; 
import './index.css';
import App from 'components/App';

if (!window.Promise) {
 window.Promise = Promise;
}

/* 
  Remember to run: npm start api 
  for mock server
*/

console.warn('Remember to run: npm start api');

ReactDOM.render(<App />, document.getElementById('root'));
