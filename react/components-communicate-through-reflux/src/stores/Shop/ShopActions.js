import Reflux from 'reflux';
import {fetchShopData} from '../../communication/shop';

const ShopActions = Reflux.createActions({
    addToInventory: {},
    removeFromInventory: {},
    load: {
        asyncResult: true,
        children: ['completed', 'failed']
    }
});

ShopActions
    .load
    .listen(function () {
        fetchShopData({completed: this.completed, failed: this.failed});
    });

export default ShopActions;