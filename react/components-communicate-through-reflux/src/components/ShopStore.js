import Reflux from 'reflux';
import shopUpdateAction from './shopUpdateAction';
import _ from 'lodash';

class ShopStore extends Reflux.Store {
  constructor(props) {
    super(props);
    this.state = {};
    this.listenTo(shopUpdateAction, this.onShopUpdate);
  }

  onShopUpdate(props) {

    let { inventory, products, addToInventory, removeFromInventory } = props;

    if (products !== undefined) {
        this.setState((prevState) => ({products: _.cloneDeep(products)}));
    }
    if (inventory !== undefined) {
      this.setState((prevState) => ({inventory: _.cloneDeep(inventory)}));
    }
    if(addToInventory !== undefined){
      //console.log({...addToInventory});
      this.setState((prevState) => {
        return {inventory: [...prevState.inventory, addToInventory.id]};
      });
    }
    if(removeFromInventory !== undefined){
      this.setState((prevState) => {
        let inventory = [...prevState.inventory];
        inventory.splice(removeFromInventory,1);
        return {inventory: inventory};
      });
    }
  }
}

export default ShopStore;