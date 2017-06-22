// libs
import React from 'react';
import {render} from 'react-dom';
// utils
import {byId} from './utils';
// components
import Basket from './components/Basket/Basket';
import Products from './components/Products/Products';
import Inventory from './components/Inventory/Inventory';


render(<Basket />, byId('basket'));

render(<Products />, byId('products'));

render(<Inventory />, byId('inventory'));
