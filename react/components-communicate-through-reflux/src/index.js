import './index.css'; // apply styling
import Promise from 'promise-polyfill'; //promise polyfill
import 'whatwg-fetch'; //fetch polyfill

import './app'; // run app

if (!window.Promise) {
    window.Promise = Promise;
}
