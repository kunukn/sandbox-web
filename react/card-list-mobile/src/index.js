import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import _ from 'lodash';
import App from './App.js';
import './index.css';
const log = console.log.bind(console);

const logo = '/assets/logos/bbc.svg';

let cards = [];
for (let i = 1; i <= 96; i++) {
  let card = {
    id: `id_${i}`,
    name: "bbc",
    price: `${i + 10} kr./md.`,
    logo,
    type: "movie",
    hasProduct: false
  };
  cards.push(card);
}
cards[1].hasProduct = true;
cards[2].hasProduct = true;
cards[3].hasProduct = true;

function qs(expr, context) {
  return (context || document).querySelector(expr);
}
function qsa(expr, context) {
  return [].slice.call((context || document).querySelectorAll(expr), 0);
}

ReactDOM.render(<App cards={cards} />, qs("#root"));