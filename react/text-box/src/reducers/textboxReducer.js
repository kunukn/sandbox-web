import _ from 'lodash';

export default function calculateReducer(state = {}, action) {
  switch (action.type) {
    case 'CALCULATE':
      return _.assign({}, _.cloneDeep(state), action.data);

    default:
      return state;
  }
}
