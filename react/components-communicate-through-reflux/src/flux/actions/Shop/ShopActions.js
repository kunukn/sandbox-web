import {createActions} from 'reflux';
import {fetchShopData} from '../../../communication/shop';
//import {fetchShopData} from '~src/communication/shop';

const ShopActions = createActions({
    init: {},
    addToInventory: {},
    removeFromInventory: {},
    updateBasketLocation: {},
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

export const {init, addToInventory, removeFromInventory, updateBasketLocation, load} = ShopActions;
export default ShopActions;
