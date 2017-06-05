import Reflux from 'reflux';
import _ from 'lodash';
import shopUpdateAction from './shopUpdateAction';

class ShopStore extends Reflux.Store {
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      inventory: [],
      stock: [],
    };
    this.listenTo(shopUpdateAction, this.onShopUpdate);
  }

  onShopUpdate(props) {

    let { inventory, products, stock, addToInventory, removeFromInventory } = props;

    if (products !== undefined) {
        this.setState(() => ({products: _.cloneDeep(products)}));
    }
    if (inventory !== undefined) {
      this.setState(() => ({inventory: _.cloneDeep(inventory)}));
    }
    if (stock !== undefined) {
        this.setState(() => ({stock: _.cloneDeep(stock)}));
    }
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