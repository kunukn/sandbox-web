import Reflux from 'reflux';
import _ from 'lodash';
import ShopActions from './ShopActions';

class ShopStore extends Reflux.Store {
  constructor() {
    super();

    //this.listenTo(ShopActions.loadData, this.onLoadData); // explicit
    //this.listenTo(ShopActions.addToInventory, this.onAddToInventory); // explicit
    //this.listenTo(ShopActions.removeFromInventory, this.onRemoveFromInventory); // explicit
    this.listenables = ShopActions; // convention
  }
  
  onLoadData(props){
    let { inventory, products, stock } = props;

    if (products !== undefined) {
        this.setState(() => ({products: _.cloneDeep(products)}));
    }
    if (inventory !== undefined) {
      this.setState(() => ({inventory: _.cloneDeep(inventory)}));
    }
    if (stock !== undefined) {
        this.setState(() => ({stock: _.cloneDeep(stock)}));
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