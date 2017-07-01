import {createActions} from 'reflux';
import {fetchShopData} from '../../../communication/shop';

const ShopActions = createActions({
    init: {},
    addToInventory: {},
    removeFromInventory: {},
    updateBasketLocation: {},
    loadData: {
        asyncResult: true,
        children: ['completed', 'failed']
    }
});

ShopActions.loadData.listen(function () {
        fetchShopData({
            completed: this.completed, 
            failed: this.failed
        });
    });

export const {init, addToInventory, removeFromInventory, updateBasketLocation, loadData} = ShopActions;
export default ShopActions;
