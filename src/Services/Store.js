import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../Reducers';

const logger = createLogger({ collapsed: true });
let middleware = [thunk, logger];

export default function() {
  return createStore(reducers, applyMiddleware(...middleware));
}