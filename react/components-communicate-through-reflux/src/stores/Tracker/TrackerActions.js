import {createActions} from 'reflux';

const TrackerActions = createActions(['track']);

export const {track} = TrackerActions;
export default TrackerActions;