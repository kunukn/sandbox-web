import _ from 'lodash';
import { log } from 'utilities/logging';

export default function calculateReducer(state = {}, action) {
  switch (action.type) {
    case 'CALCULATE':
       log('calculateReducer', action.data);
      return _.cloneDeep(_.assign({}, state, {value: action.data}));
    default:
      return state;
  }
}
