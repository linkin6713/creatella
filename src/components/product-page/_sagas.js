import {call, put, takeLatest} from 'redux-saga/effects';
import ProductServiceInstance from '../../services/product-serivce';
import * as ACTIONS from "./_actions";

// worker Saga: will be fired on LOAD_PRODUCT actions
// call server to load list of products
export function* loadProducts(payload) {
  yield put(ACTIONS.showLoading(true));
  let productResult = yield call([ProductServiceInstance, ProductServiceInstance.getProducts], payload.filter.page , payload.filter.sort);
  if (productResult) {
    payload.filter.totalRows = productResult.totalRows;
    yield put(ACTIONS.firstLoadProductSuccess(productResult.products, payload.filter));
  }
  else {
    yield put(ACTIONS.firstLoadProductFail());
  }
  yield put(ACTIONS.showLoading(false));
}


// worker Saga: will be fired on SORT_PRODUCT actions
// call server to sort products
export function* sortProducts(payload) {
  yield put(ACTIONS.showLoading(true));
  let productResult = yield call([ProductServiceInstance, ProductServiceInstance.sortProducts], payload.filter.sort);
  if (productResult) {
    yield put(ACTIONS.sortProductSuccess(productResult.products, payload.filter));
  }
  else {
    yield put(ACTIONS.sortProductFail());
  }
  yield put(ACTIONS.showLoading(false));
}


// worker Saga: will be fired on PRE_LOAD_PRODUCT actions
// call server to preload list of products
export function* preloadProducts(payload) {
  yield put(ACTIONS.showLoading(true));
  let productResult = yield call([ProductServiceInstance, ProductServiceInstance.getProducts], payload.filter.page + 1, payload.filter.sort);
  if (productResult) {
    payload.filter.totalRows = productResult.totalRows;
    yield put(ACTIONS.preloadProductSuccess(productResult.products, payload.filter));
  }
  else {
    yield put(ACTIONS.preloadProductFail());
  }
  yield put(ACTIONS.showLoading(false));
}

// starts on each dispatched action.
export function* mySaga() {
  yield takeLatest(ACTIONS.FIRST_LOAD_PRODUCT, loadProducts);
  yield takeLatest(ACTIONS.SORT_PRODUCT, sortProducts);
  yield takeLatest(ACTIONS.PRE_LOAD_PRODUCT, preloadProducts);
}
