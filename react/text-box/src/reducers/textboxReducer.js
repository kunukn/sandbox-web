import _ from 'lodash';
//import { log } from 'utilities/logging';
import * as ACTION from 'actions/actionTypes';
import initialState from './initialState';

export default function calculateReducer(state = initialState.textbox, action) {
  switch (action.type) {
    case ACTION.CALCULATE_SUCCESS:
      return _.assign({}, state, action.payload, { isSuccess: true, isOverlayOpen: true });
    case ACTION.CALCULATE_FAILURE:
      return _.assign({}, state, action.payload, { isSuccess: false, isOverlayOpen: true });
    case ACTION.CLOSE_OVERLAY:
      return _.assign({}, state, { isOverlayOpen: false });
    default:
      return state;
  }
}
