import {Store} from 'reflux';
import BoxActions from './BoxActions';

export default class BoxStore2 extends Store
{
    constructor()
    {
        super();
        this.state = {};
        this.listenables = BoxActions;
    }

    onUpdate(number)
    {
        console.log(`onUpdate BoxStore2 (${number})`)

        this.setState((prevState) => {
            
            if (prevState.number === number) {
                return {number: undefined}
            }

            return {number}
        });
    }
}
