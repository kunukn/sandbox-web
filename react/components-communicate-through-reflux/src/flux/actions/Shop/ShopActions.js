import {createActions} from 'reflux';
import {fetchShopData} from '../../../communication/shop';

const ShopActions = createActions({
    init: {},
    addToInventory: {},
    removeFromInventory: {},
    updateBasketLocation: {},
    loadData: {
        // Code example of action which can listen and do stuff
        // Not actually used in this webapp
        asyncResult: true,
        children: ['completed', 'failed']
    }
});

ShopActions.loadData.listen(function () {
       // Listen on this action and do stuff
        fetchShopData({
            completed: this.completed, 
            failed: this.failed
        });
    });

export const {init, addToInventory, removeFromInventory, updateBasketLocation, loadData} = ShopActions;
export default ShopActions;
