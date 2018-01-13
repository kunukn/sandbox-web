import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers/';
import thunk from 'redux-thunk';

/* Redux middleware that show error when you try to mutate your state either inside a dispatch or between dispatches */
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())),
  );
}
