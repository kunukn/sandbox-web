// libs
import React from 'react';
import {render} from 'react-dom';
// utils
import {byId} from './utils';
// store
import ShopActions from './stores/Shop/ShopActions';
// components
import Basket from './components/Basket/Basket';
import Products from './components/Products/Products';
import Inventory from './components/Inventory/Inventory';


render(<Basket />, byId('basket'));

render(<Products />, byId('products'));

render(<Inventory />, byId('inventory'));

// On route to this page call at the right time action
ShopActions.init();
