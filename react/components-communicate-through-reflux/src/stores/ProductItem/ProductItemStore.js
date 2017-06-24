import {Store} from 'reflux';
import ProductItemActions from './ProductItemActions';

class ProductItem extends Store {
    constructor() {
        super();
        this.listenables = ProductItemActions;
    }

    onHover(isHovering) {
        this.setState({hover: isHovering})
    }
}

ProductItem.id = 'myUniqueGlobalProductItemStoreId';

export default ProductItem;