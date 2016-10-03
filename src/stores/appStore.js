import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import mockData from '../mock/data';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const logger = createLogger();
const appStore = createStore(
  rootReducer,
  mockData,
  applyMiddleware(promise, /*logger*/),
);

export default appStore;
