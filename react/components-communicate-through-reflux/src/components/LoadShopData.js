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
      {
        id: 1,
        name: 'TV',
        type: 1,
        icon: 'tv'
      }, {
        id: 2,
        name: 'Phone',
        type: 2,
        icon: 'phone_android'
      }, {
        id: 3,
        name: 'Headset',
        type: 3,
        icon: 'headset'
      }, {
        id: 4,
        name: 'Motorcycle',
        type: 4,
        icon: 'motorcycle'
      }
    ],
    inventory: [
      1, 3
    ],
    stock: [
      {
        id: 1,
        count: 4
      },
      {
        id: 2,
        count: 3
      },{
        id: 3,
        count: 2
      },
      {
        id: 4,
        count: 1
      },
      {
        id: 5,
        count: 1
      }
    ]
  };
}

export default LoadShopData;
