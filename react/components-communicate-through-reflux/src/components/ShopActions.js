import Reflux from 'reflux';
const ShopActions = Reflux.createActions([    
    'getData',
    'addToInventory',
    'removeFromInventory',
]);
export default ShopActions;