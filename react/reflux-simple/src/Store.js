import Reflux from 'reflux';
import Actions from './Actions';

export default class Store extends Reflux.Store
{
    constructor()
    {
        super();
        this.listenables = Actions;
    }

    onUpdate(index)
    {
        console.log(index);
        
        this.setState((prevState, props) => {
            if (prevState.index === index) {
                return {index: undefined}
            }
            return {index}
        });
    }
}
