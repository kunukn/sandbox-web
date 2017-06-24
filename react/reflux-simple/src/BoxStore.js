import Reflux from 'reflux';
import BoxActions from './BoxActions';

export default class BoxStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.listenables = BoxActions;
    }

    onUpdate(value)
    {
        console.log(`onUpdate(${value})`)

        this.setState((prevState, props) => {
            
            if (prevState.value === value) {
                return {value: undefined}
            }

            return {value}
        });
    }
}
