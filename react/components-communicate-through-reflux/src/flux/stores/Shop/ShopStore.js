// libs
import { Store } from 'reflux';
import _ from 'lodash';
// flux 
import ShopActions from '../../actions/Shop/ShopActions';
// utils
import { log } from '../../../utils';
import { fetchShopData } from '../../../communication/shop';

class ShopStore extends Store {

    constructor() {
        super();
        this.state = {
            loadingTracker: {
                isLoading: true,
            }
        };
        this.listenables = ShopActions; // convention
        // or this.listenToMany(ShopActions); // convention

        this.onInit();
    }

    onInit() {
        log('onInit');

        log('loading data');
        //ShopActions.loadData();

        this.setupLoadingTracker();
        
        fetchShopData({
            completed: ({products, inventory, stock}) => {this.updateState({products, inventory, stock, isLoading: false})},
            failed: ex => log(ex)
        });
    }

    onUpdateBasketLocation(basketLocation){
        log('onUpdateBasketLocation');
        //log(basketLocation);
        this.setState({
            basketLocation
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

    onLoadDataCompleted({products, inventory, stock}) {
            log('onLoadCompleted');
            this.updateState({products, inventory, stock, isLoading: false});
    }

    onLoadDataFailed(message) {
        log('onLoadFailed');
        log(message);
        this.setState({
            loadingTracker: {
                isLoading: false,
                isLoadingFailed: true,
            }    
        });
    }
    
    updateState({products, inventory, stock, isLoading}) {
        // simulate latency            
        
        setTimeout(()=>{ 
            this.setState(() => ({
                loadingTracker: {
                    isLoading,
                },
                products: _.cloneDeep(products),
                inventory: _.cloneDeep(inventory),
                stock: _.cloneDeep(stock),
                
            }));
        
        clearTimeout(this.longLoadingTimer);
            
        }, 400000);
    }

    setupLoadingTracker(){
        this.loadingSpinnerTimer = setTimeout( () => this.setState(prevState => {
            const loadingTracker = Object.assign({}, prevState.loadingTracker, {isLoadingSpinner:true});
            return Object.assign({},prevState,{loadingTracker});
        }), 500);
        this.longLoadingTimer = setTimeout( () => this.setState(prevState => {
            const loadingTracker = Object.assign({}, prevState.loadingTracker, {isLoadingLong:true});
            return Object.assign({},prevState,{loadingTracker});
        }), 3000);
    }
}

ShopStore.id = 'myUniqueGlobalShopStoreId';

export default ShopStore;