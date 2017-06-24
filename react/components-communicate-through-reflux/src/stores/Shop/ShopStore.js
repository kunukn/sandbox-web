// libs
import { Store } from 'reflux';
import _ from 'lodash';

//
import ShopActions from './ShopActions';
import { log } from '../../utils';
//import { fetchShopData } from '../../communication/shop';

let initCount = 0;

class ShopStore extends Store {
    constructor() {
        super();
        this.listenables = ShopActions; // convention
        // or this.listenToMany(ShopActions); // convention
    }

    onInit() {
        log('onInit');

        if( !initCount++ ){
            log('loading data');
            ShopActions.load();

            /*fetchShopData({
                completed: json => updateState(this, json),
                failed: ex => log(ex)
            });*/
        }
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

ShopStore.id = 'myUniqueGlobalShopStoreId';

export default ShopStore;