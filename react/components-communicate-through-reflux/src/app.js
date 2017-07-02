// libs
import {render} from 'react-dom';
// utils
import {toDOM, createAndAppendById} from './utils';
// store
//import ShopActions from './flux/actions/Shop/ShopActions';
// components
import Basket from './components/Basket';
import Products from './components/Products';
import Inventory from './components/Inventory';
import InventorySummary from './components/InventorySummary';

render(toDOM(Basket, {theme: 'light'}), createAndAppendById('placeholder-1'));
render(toDOM(Products, {theme: 'dark'}), createAndAppendById('placeholder-2'));
render(toDOM(Inventory, {theme: 'default'}), createAndAppendById('placeholder-3'));
render(toDOM(InventorySummary, {theme: 'dark'}), createAndAppendById('placeholder-3'));
render(toDOM(InventorySummary, {theme: 'light'}), createAndAppendById('placeholder-3'));
//render(toDOM(Products), createAndAppenById('placeholder-2'));
//render(toDOM(Inventory), createAndAppenById('placeholder-3'));

// On route to this page call at the right time action
//ShopActions.init();
