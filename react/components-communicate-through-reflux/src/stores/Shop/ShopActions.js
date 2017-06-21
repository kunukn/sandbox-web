import Reflux from 'reflux';

const ShopActions = Reflux.createActions({
    addToInventory: {},
    removeFromInventory: {},
    load: {asyncResult: true, children: ['completed', 'failed']},
});

ShopActions.load.listen( function() {
    window.fetch('/shop.json')
        .then(response => response.json())
        .then( this.completed )
        .catch( this.failed );
});

export default ShopActions;