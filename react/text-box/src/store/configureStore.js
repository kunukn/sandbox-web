import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers/index.js';
import thunk from 'redux-thunk';

/* Redux middleware that show error when you try to mutate your state either inside a dispatch or between dispatches */
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
