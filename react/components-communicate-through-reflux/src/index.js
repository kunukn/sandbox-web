import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import LoadShopData from './components/LoadShopData';
import Basket from './components/Basket';
import Products from './components/Products';
import Inventory from './components/Inventory';
import ShopStore from './components/ShopStore';
import shopUpdateAction from './components/shopUpdateAction';

ReactDOM.render(<Basket store={ShopStore} storeAction={shopUpdateAction}/>, byId('basket'));
ReactDOM.render(<Products store={ShopStore} storeAction={shopUpdateAction} />, byId('products'));
ReactDOM.render(<Inventory store={ShopStore} storeAction={shopUpdateAction} />, byId('inventory'));
ReactDOM.render(<LoadShopData store={ShopStore} storeAction={shopUpdateAction}/>, byId('load-shop-data'));

function byId(id) {
  return document.getElementById(id);
}
