import {createActions} from 'reflux';
import {fetchShopData} from '../../communication/shop';

const ShopActions = createActions({
    init: {},
    addToInventory: {},
    removeFromInventory: {},
    basketInit: {},
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

export default ShopActions;
