import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers/index.js';

/* Redux middleware that show error when you try to mutate your state either inside a dispatch or between dispatches */
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxImmutableStateInvariant())
  );
}
