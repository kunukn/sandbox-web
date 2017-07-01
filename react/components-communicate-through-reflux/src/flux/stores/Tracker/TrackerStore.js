// libs
import {Store} from 'reflux';

// flux
import TrackerActions from '../../actions/Tracker/TrackerActions';

// utils
import {log} from '../../../utils';

class TrackerStore extends Store {
    constructor() {
        super();
        this.listenables = TrackerActions; // convention
    }

    onTrack(event) {
        log(event);
    }
}

TrackerStore.id = 'myUniqueGlobalTrackerStoreId';

export default TrackerStore;