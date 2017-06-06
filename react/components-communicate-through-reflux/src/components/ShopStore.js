import Reflux from 'reflux';
import _ from 'lodash';
import ShopActions from './ShopActions';
import {mockLoadShopData} from './MockData';

class ShopStore extends Reflux.Store {
  constructor() {
    super();

    this.state = {
      products: [],
      inventory: [],
      stock: [],
    }
    
    //this.listenTo(ShopActions.getData, this.onGetData); // explicit
    //this.listenTo(ShopActions.addToInventory, this.onAddToInventory); // explicit
    //this.listenTo(ShopActions.removeFromInventory, this.onRemoveFromInventory); // explicit
    this.listenables = ShopActions; // convention
  }
  
  onGetData(){    
    if(this.state.products === undefined || this.state.products.length === 0) {        
        let mockData = mockLoadShopData();
        this.setState(() => ({products: _.cloneDeep(mockData.products)}));
    }
    if(this.state.inventory === undefined || this.state.inventory.length === 0) {        
        let mockData = mockLoadShopData();
        this.setState(() => ({inventory: _.cloneDeep(mockData.inventory)}));
    }
    if(this.state.stock === undefined || this.state.stock.length === 0) {        
        let mockData = mockLoadShopData();
        this.setState(() => ({stock: _.cloneDeep(mockData.stock)}));
    }  
  }

  onAddToInventory(props) {

    let { addToInventory } = props;

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

  onRemoveFromInventory(props) {

    let { removeFromInventory } = props;

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