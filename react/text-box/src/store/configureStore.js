import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers/';
import thunk from 'redux-thunk';

/* Redux middleware that show error when you try to mutate your state either inside a dispatch or between dispatches */
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, reduxImmutableStateInvariant()),
  );
}
