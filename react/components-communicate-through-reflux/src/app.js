// libs
import {render} from 'react-dom';
// utils
import {toDOM, createAndAppendById, log} from './utils';
// components
import Basket from './components/Basket';
import Products from './components/Products';
import Inventory from './components/Inventory';
import InventorySummary from './components/InventorySummary';

render(toDOM(Basket, {theme: 'light'}), createAndAppendById('placeholder-1'));
render(toDOM(Products, {theme: 'dark'}), createAndAppendById('placeholder-2'));
render(toDOM(Inventory, {theme: 'dark'}), createAndAppendById('placeholder-3'));
render(toDOM(InventorySummary, {theme: 'light'}), createAndAppendById('placeholder-3'));
//render(toDOM(InventorySummary, {theme: 'dark'}), createAndAppendById('placeholder-3'));
//render(toDOM(Products, {theme: 'default'}), createAndAppendById('placeholder-3'));
//render(toDOM(Inventory, {theme: 'light'}), createAndAppendById('placeholder-3'));
//render(toDOM(Inventory, {theme: 'default'}), createAndAppendById('placeholder-3'));

log('%c You can type in console:','background: #003d2b; color: #fff');
log('%c printShopState() printTrackerState() getShopState() getTrackerState()', 'background: #003d2b; color: #fff');