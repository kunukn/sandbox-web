import {createActions} from 'reflux';

const ProductItemActions = createActions(['hover']);

export const {hover} = ProductItemActions;
export default ProductItemActions;