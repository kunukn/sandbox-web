import './index.css';
import 'whatwg-fetch';
import Promise from 'promise-polyfill';

import './app';

if (!window.Promise) {
    window.Promise = Promise;
}
