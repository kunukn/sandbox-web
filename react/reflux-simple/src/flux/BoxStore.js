import {Store} from 'reflux';
import BoxActions from './BoxActions';

export default class BoxStore extends Store
{
    constructor()
    {
        super();
        this.state = {};
        this.listenables = BoxActions;
    }

    onUpdate(number)
    {
        console.log(`onUpdate BoxStore (${number})`)

        this.setState((prevState) => {
            
            if (prevState.number === number) {
                return {number: undefined}
            }

            return {number}
        });
    }
}
