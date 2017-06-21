import Reflux from 'reflux';
import _ from 'lodash';
import ShopActions from './ShopActions';

class ShopStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = ShopActions; // convention
    }

    onLoadCompleted(json) {

        console.log('onLoadCompleted');

        this.setState(() => ({
            products: _.cloneDeep(json.products),
            inventory: _.cloneDeep(json.inventory),
            stock: _.cloneDeep(json.stock),
        }));
    }

    onLoadFailed(message) {
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

export default ShopStore;