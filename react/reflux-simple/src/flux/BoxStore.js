import {Store} from 'reflux';
import BoxActions from './BoxActions';

export default class BoxStore extends Store
{
    constructor()
    {
        super();
        this.state = {};
        //this.state = {number: 2};
        this.listenables = BoxActions;
    }

    onUpdate(number)
    {
        console.log(`onUpdate BoxStore (${number})`);
        
        this.setState((prevState) => {

            //console.log(`prevState BoxStore ${prevState.number}`);
            
            if (prevState.number === number) {
                return {number: undefined}
            }

            return {number}
        });
    }
}
