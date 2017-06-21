// libs
import React from 'react';
import {render} from 'react-dom';

// project
import Basket from './components/Basket/Basket';
import Products from './components/Products/Products';
import Inventory from './components/Inventory/Inventory';

import ShopStore from './stores/Shop/ShopStore';
import ShopActions from './stores/Shop/ShopActions';

render(<Basket store={ShopStore} storeActions={ShopActions}/>, byId('basket'));

render(<Products store={ShopStore} storeActions={ShopActions}/>, byId('products'));

render(<Inventory store={ShopStore} storeActions={ShopActions}/>, byId('inventory'));

function byId(id) {
    return document.getElementById(id);
}
