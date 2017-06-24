import {Store} from 'reflux';
import ProductItemActions from './ProductItemActions';

class ProductItem extends Store {
    constructor() {
        super();
        this.listenables = ProductItemActions;
    }

    onHover({hover, hoverIndex}) {
        this.setState({hover, hoverIndex});
    }
}

ProductItem.id = 'myUniqueGlobalProductItemStoreId';

export default ProductItem;