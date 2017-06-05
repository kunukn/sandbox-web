import Reflux from 'reflux';
//const shopActions = Reflux.createAction();
const ShopActions = Reflux.createActions([
    'loadData',
    'addToInventory',
    'removeFromInventory',
]);
export default ShopActions;