import {Store} from 'reflux';
import BoxActions from './BoxActions';

export default class BoxStore2 extends Store
{
    constructor()
    {
        super();
        this.listenables = BoxActions;
    }

    onUpdate(number)
    {
        console.log(`onUpdate BoxStore2 (${number})`)

        this.setState((prevState) => {
            console.log(`prevState BoxStore2 ${prevState.number}`);
            return {number: 1};
        });
    }
}
