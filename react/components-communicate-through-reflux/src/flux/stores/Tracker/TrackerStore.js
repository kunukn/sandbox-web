// libs
import {Store} from 'reflux';

//
import TrackerActions from './TrackerActions';
import {log} from '../../../utils';

class TrackerStore extends Store {
    constructor() {
        super();
        this.listenables = TrackerActions; // convention
    }

    onTrack(event) {
        //log('onTrack');
        log(event);
    }
}

TrackerStore.id = 'myUniqueGlobalTrackerStoreId';

export default TrackerStore;