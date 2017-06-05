import React from 'react';
import {render} from 'react-dom';

import './index.css';
import LoadShopData from './components/LoadShopData';
import Basket from './components/Basket';
import Products from './components/Products';
import Inventory from './components/Inventory';
import ShopStore from './components/ShopStore';
import ShopActions from './components/ShopActions';

render(<Basket store={ShopStore} storeActions={ShopActions}/>, byId('basket'));
render(<Products store={ShopStore} storeActions={ShopActions} />, byId('products'));
render(<Inventory store={ShopStore} storeActions={ShopActions} />, byId('inventory'));
render(<LoadShopData store={ShopStore} storeActions={ShopActions}/>, byId('load-shop-data'));

function byId(id) {
  return document.getElementById(id);
}
