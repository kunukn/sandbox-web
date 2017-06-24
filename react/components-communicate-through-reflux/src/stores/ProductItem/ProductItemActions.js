import {createActions} from 'reflux';

const ProductItemActions = createActions(['hover']);
const hover = ProductItemActions.hover;

export {hover};
export default ProductItemActions;