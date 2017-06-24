import {createActions} from 'reflux';

const TrackerActions = createActions(['track']);
const track = TrackerActions.track;

export {track};
export default TrackerActions;