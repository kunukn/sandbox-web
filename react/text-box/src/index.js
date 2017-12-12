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
  Remember to run: yarn api 
  for mock server
*/

ReactDOM.render(<App />, document.getElementById('root'));
