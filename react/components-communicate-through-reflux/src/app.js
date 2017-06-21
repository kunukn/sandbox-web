// libs
import React from 'react';
import {render} from 'react-dom';

// utils
import {byId} from './utils';

// components
import Basket from './components/Basket/Basket';
import Products from './components/Products/Products';
import Inventory from './components/Inventory/Inventory';

// store
import ShopStore from './stores/Shop/ShopStore';
import ShopActions from './stores/Shop/ShopActions';

render(<Basket store={ShopStore} storeActions={ShopActions}/>, byId('basket'));

render(<Products store={ShopStore} storeActions={ShopActions}/>, byId('products'));

render(<Inventory store={ShopStore} storeActions={ShopActions}/>, byId('inventory'));
