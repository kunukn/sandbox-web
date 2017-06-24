import {createActions} from 'reflux';

const ShopActions = createActions(['init', 'addToInventory', 'removeFromInventory']);

export default ShopActions;




/*
const ShopActions = createActions({
    init: {},
    addToInventory: {},
    removeFromInventory: {},
    load: {
        asyncResult: true,
        children: ['completed', 'failed']
    }
});
ShopActions.load.listen(function () {
        fetchShopData({
            completed: this.completed, 
            failed: this.failed
        });
    });
*/