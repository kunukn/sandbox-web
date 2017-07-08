// libs
import {Store} from 'reflux';
// flux
import TrackerActions from '../../actions/Tracker/TrackerActions';

class TrackerStore extends Store {
    constructor() {
        super();
        this.state = {
            track: []
        };
        this.listenables = TrackerActions;
        window.getTrackerState = () => this.state;
        window.printTrackerState = () => JSON.stringify(this.state, null, '\t');
    }

    onTrack(event) {
        this.state.track.push(event);
        //console.log(event);
    }
}

TrackerStore.id = 'myUniqueGlobalTrackerStoreId';

export default TrackerStore;