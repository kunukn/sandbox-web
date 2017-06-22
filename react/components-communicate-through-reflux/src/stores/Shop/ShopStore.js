// libs
import Reflux from 'reflux';
import _ from 'lodash';

//
import ShopActions from './ShopActions';
import {log} from '../../utils';
import {fetchShopData} from '../../communication/shop';

class ShopStore extends Reflux.Store {
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

    onAddToInventory({addToInventory}) {

        if (addToInventory !== undefined) {
            this.setState((prevState) => {

                let stockItem = _.find(prevState.stock, {id: addToInventory.id});
                if (stockItem.count <= 0) {
                    return {};
                }

                stockItem.count--;

                return {
                    inventory: [
                        ...prevState.inventory,
                        addToInventory.id
                    ],
                    stock: [...prevState.stock]
                };
            });
        }
    }

    onRemoveFromInventory({removeFromInventory}) {

        if (removeFromInventory !== undefined) {
            this.setState((prevState) => {

                let {index, product} = removeFromInventory;
                let stockItem = _.find(prevState.stock, {id: product.id});

                stockItem.count++;
                prevState
                    .inventory
                    .splice(index, 1);

                return {
                    inventory: [...prevState.inventory],
                    stock: [...prevState.stock]
                };
            });
        }
    }

    onLoadCompleted(json) {
        log('onLoadCompleted');
        updateState(this, json);
    }

    onLoadFailed(message) {
        log('onLoadFailed');
        log(message);
        // failed, with whatever message you sent
    }
}

function updateState(store, {products, inventory, stock}) {
    store.setState(() => ({
        products: _.cloneDeep(products),
        inventory: _.cloneDeep(inventory),
        stock: _.cloneDeep(stock)
    }));
}

ShopStore.id = 'myUniqueShopStoreId';

export default ShopStore;