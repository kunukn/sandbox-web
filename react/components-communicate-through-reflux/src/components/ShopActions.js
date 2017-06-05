import {createActions} from 'reflux';
const ShopActions = createActions([
    'loadData',
    'addToInventory',
    'removeFromInventory',
]);
export default ShopActions;