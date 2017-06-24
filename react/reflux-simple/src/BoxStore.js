import {Store} from 'reflux';
import BoxActions from './BoxActions';

export default class BoxStore extends Store
{
    constructor()
    {
        super();
        this.listenables = BoxActions;
    }

    onUpdate(count)
    {
        console.log(`onUpdate(${count})`)

        this.setState((prevState, props) => {
            
            if (prevState.count === count) {
                return {count: undefined}
            }

            return {count}
        });
    }
}
