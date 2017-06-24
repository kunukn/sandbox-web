// libs
import {render} from 'react-dom';
// utils
import {byId, toDOM} from './utils';
// store
import ShopActions from './stores/Shop/ShopActions';
// components
import Basket from './components/Basket/Basket';
import Products from './components/Products/Products';
import Inventory from './components/Inventory/Inventory';

render(toDOM(Basket), byId('placeholder-1'));

render(toDOM(Products), byId('placeholder-2'));

render(toDOM(Inventory), byId('placeholder-3'));

// On route to this page call at the right time action
ShopActions.init();
