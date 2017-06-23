import Reflux from 'reflux';
import BoxActions from './BoxActions';

export default class BoxStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.listenables = BoxActions;
    }

    onUpdate(index)
    {
        console.log(`box ${index + 1}`);
        
        this.setState((prevState, props) => {
            
            if (prevState.index === index) {
                return {index: undefined}
            }

            return {index: index}
        });
    }
}
