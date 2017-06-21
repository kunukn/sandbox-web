import Reflux from 'reflux';
import _ from 'lodash';
import ShopActions from './ShopActions';

let hasDataLoaded = false;

class ShopStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = ShopActions; // convention
    }

    onInit() {
        console.log('onInit');

        if (!hasDataLoaded) {

            hasDataLoaded = true;

            console.log('loading data');

            window.fetch('/shop.json')
                .then(response => response.json())
                .then(json => updateState(this, json))
                .catch((ex) => {
                    console.log(ex);
                    hasDataLoaded = false;
                });
        }
    }

    onLoadCompleted(json) {
        console.log('onLoadCompleted');
        updateState(this, json);
    }

    onLoadFailed(message) {
        console.log('onLoadFailed');
        console.log(message);
        // failed, with whatever message you sent
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
                    inventory: [...prevState.inventory, addToInventory.id],
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
                prevState.inventory.splice(index, 1);

                return {
                    inventory: [...prevState.inventory],
                    stock: [...prevState.stock]
                };
            });
        }
    }
}

function updateState(store, data) {
    store.setState(() => ({
        products: _.cloneDeep(data.products),
        inventory: _.cloneDeep(data.inventory),
        stock: _.cloneDeep(data.stock),
    }));
}

export default ShopStore;