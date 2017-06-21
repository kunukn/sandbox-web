import Reflux from 'reflux';
import _ from 'lodash';
import ShopActions from './ShopActions';
import {mockLoadShopData} from '../../mock-data/mockLoadShopData';

class ShopStore extends Reflux.Store {
  constructor() {
    super();

    //this.listenTo(ShopActions.getData, this.onGetData); // explicit
    //this.listenTo(ShopActions.addToInventory, this.onAddToInventory); // explicit
    //this.listenTo(ShopActions.removeFromInventory, this.onRemoveFromInventory); // explicit
    this.listenables = ShopActions; // convention
  }
  
  onGetData(){    
    if(this.state.products === undefined) {        
        this.setState(() => ({products: _.cloneDeep(mockLoadShopData.products)}));
    }
    if(this.state.inventory === undefined) {        
        this.setState(() => ({inventory: _.cloneDeep(mockLoadShopData.inventory)}));
    }
    if(this.state.stock === undefined) {        
        this.setState(() => ({stock: _.cloneDeep(mockLoadShopData.stock)}));
    }  
  }

  onAddToInventory({ addToInventory }) {

    if(addToInventory !== undefined){
      this.setState((prevState) => {
        
        let stockItem = _.find(prevState.stock, {id: addToInventory.id});
        if(stockItem.count <=0 ){
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

  onRemoveFromInventory({ removeFromInventory }) {

    if(removeFromInventory !== undefined){
      this.setState((prevState) => {
        
        let {index, product} = removeFromInventory;
        let stockItem = _.find(prevState.stock, {id: product.id});

        stockItem.count++;
        prevState.inventory.splice(index,1);

        return {
          inventory: [...prevState.inventory],
          stock: [...prevState.stock]
        };
      });
    }
  }
}

export default ShopStore;