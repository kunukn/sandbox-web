// libs
import {Store} from 'reflux';
// utils
import {log} from '../../../utils';
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

    onTrack(json) {
        let trackInfo = {...json, trackTimestamp: +new Date()}
        this.state.track.push(trackInfo);
        log(`%c ${JSON.stringify(trackInfo)}`, 'color: #777');
    }
}

TrackerStore.id = 'myUniqueGlobalTrackerStoreId';

export default TrackerStore;