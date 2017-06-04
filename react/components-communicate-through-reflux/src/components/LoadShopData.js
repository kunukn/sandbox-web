import Reflux from 'reflux';

class LoadShopData extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = props.store;
    this.storeAction = props.storeAction;
  }

  render() {
    return null;
  }

  componentDidMount() {
    this.storeAction(mockLoadShopData());
  }
}


function mockLoadShopData() {
  return {
    products: [
      { id: 1, name: 'TV', type: 1, icon: 'tv' },
      { id: 2, name: 'Phone', type: 2, icon: 'phone_android' },
      { id: 3, name: 'Security', type: 3, icon: 'lock' },
    ],
    inventory: [1,3,2,1]
  };
}


export default LoadShopData;
