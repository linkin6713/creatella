// define actions type
export const SHOW_LOADING = 'SHOW_LOADING';

export const FIRST_LOAD_PRODUCT = 'FIRST_LOAD_PRODUCT';
export const FIRST_LOAD_PRODUCT_SUCCESS = 'FIRST_LOAD_PRODUCT_SUCCESS';
export const FIRST_LOAD_PRODUCT_FAIL = 'FIRST_LOAD_PRODUCT_FAIL';

export const SORT_PRODUCT = 'SORT_PRODUCT';
export const SORT_PRODUCT_SUCCESS = 'SORT_PRODUCT_SUCCESS';
export const SORT_PRODUCT_FAIL = 'SORT_PRODUCT_FAIL';

export const PRE_LOAD_PRODUCT = 'PRE_LOAD_PRODUCT';
export const PRE_LOAD_PRODUCT_SUCCESS = 'PRE_LOAD_PRODUCT_SUCCESS';
export const PRE_LOAD_PRODUCT_FAIL = 'PRE_LOAD_PRODUCT_FAIL';

export const SHOW_PRE_LOAD_PRODUCT = 'SHOW_PRE_LOAD_PRODUCT';
export const SHOW_PRE_LOAD_PRODUCT_SUCCESS = 'SHOW_PRE_LOAD_PRODUCT_SUCCESS';
export const SHOW_PRE_LOAD_PRODUCT_FAIL = 'SHOW_PRE_LOAD_PRODUCT_FAIL';

export const ADD_PRE_LOAD_PRODUCT = 'ADD_PRE_LOAD_PRODUCT';

// define list of actions
// action show loading text
export function showLoading(isLoading) {
  return {
    type: SHOW_LOADING,
    isLoading: isLoading
  };
}


// action load products at first time
export function firstLoadProduct(filter) {
  return {
    type: FIRST_LOAD_PRODUCT,
    filter: filter,
  };
}

export function firstLoadProductSuccess(products, filter) {
  return {
    type: FIRST_LOAD_PRODUCT_SUCCESS,
    filter: filter,
    preloadProducts: products,
  };
}

export function firstLoadProductFail() {
  return {
    type: FIRST_LOAD_PRODUCT_FAIL
  };
}


// action preload products
export function preloadProduct(filter) {
  return {
    type: PRE_LOAD_PRODUCT,
    filter: filter,
  };
}

export function preloadProductSuccess(products, filter) {
  return {
    type: PRE_LOAD_PRODUCT_SUCCESS,
    filter: filter,
    preloadProducts: products,
  };
}

export function preloadProductFail() {
  return {
    type: PRE_LOAD_PRODUCT_FAIL
  };
}


// action add preload products
export function addPreloadProduct() {
  return {
    type: ADD_PRE_LOAD_PRODUCT,
  };
}


// action sort list of products
export function sortProduct(filter) {
  return {
    type: SORT_PRODUCT,
    filter: filter,
  };
}

export function sortProductSuccess(products, filter) {
  return {
    type: SORT_PRODUCT_SUCCESS,
    filter: filter,
    preloadProducts: products,
  };
}

export function sortProductFail() {
  return {
    type: SORT_PRODUCT_FAIL
  };
}