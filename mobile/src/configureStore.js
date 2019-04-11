import initialState from './reducers/initialState';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import combiner from './reducers/combiner';

export default function configureStore(state = initialState) {
  const store = createStore(
    combiner,
    state,
    applyMiddleware(thunk, logger)
  );
  return store;
}