// libs
import {Store} from 'reflux';
import _ from 'lodash';

//
import ShopActions from './ShopActions';
import {log} from '../../utils';
import {fetchShopData} from '../../communication/shop';

class ShopStore extends Store {
    constructor() {
        super();
        this.listenables = ShopActions; // convention
    }

    onInit() {
        log('onInit');

        log('loading data');

        fetchShopData({
            completed: json => updateState(this, json),
            failed: ex => log(ex)
        });
    }

    onAddToInventory(addToInventory) {

        this.setState((prevState) => {

            let stockItem = _.find(prevState.stock, {id: addToInventory.id});
            if (stockItem.count <= 0) {
                return {};
            }

            stockItem.count--;
            prevState.inventory.push(addToInventory.id);

            return {
                inventory: _.cloneDeep(prevState.inventory),
                stock: _.cloneDeep(prevState.stock)
            };
        });

    }

    onRemoveFromInventory(removeFromInventory) {

        this.setState((prevState) => {

            let {index, product} = removeFromInventory;
            let stockItem = _.find(prevState.stock, {id: product.id});

            stockItem.count++;
            prevState.inventory.splice(index, 1);

            return {
                inventory: _.cloneDeep(prevState.inventory),
                stock: _.cloneDeep(prevState.stock)
            };
        });
    }
}

function updateState(store, {products, inventory, stock}) {
    store.setState(() => ({
        products: _.cloneDeep(products),
        inventory: _.cloneDeep(inventory),
        stock: _.cloneDeep(stock)
    }));
}

ShopStore.id = 'myUniqueGlobalShopStoreId';

export default ShopStore;