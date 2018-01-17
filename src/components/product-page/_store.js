import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './_reducer';
import {mySaga} from './_sagas';

// init default state
let defaultState = {
  showingProducts: [],
  preloadProducts: [],
  isLoading: false,
  isSorting: false,
  isFirstFetch: true,
  filter: {
    page: 1,
    sort: null,
    totalRows: 0,
  }
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(
  reducer,
  defaultState,
  applyMiddleware(sagaMiddleware)
);

// then run the saga
sagaMiddleware.run(mySaga);

export default store;