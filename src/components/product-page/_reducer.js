import * as ACTIONS from "./_actions";

export default function reducer(state, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case ACTIONS.SHOW_LOADING: // show loading animation
      newState.isLoading = action.isLoading;
      return newState;

    case ACTIONS.FIRST_LOAD_PRODUCT_SUCCESS: // loaded list of products successfully
      newState.showingProducts = newState.showingProducts ? newState.showingProducts.concat(action.preloadProducts) : action.preloadProducts;
      newState.filter = action.filter;
      newState.isLoading = false;
      if (newState.isFirstFetch)
        newState.isFirstFetch = false;
      return newState;

    case ACTIONS.SORT_PRODUCT: // begin sort products
      newState.showingProducts = [];
      newState.filter.page = 1;
      return newState;

    case ACTIONS.SORT_PRODUCT_SUCCESS: // sorted products successfully
      newState.showingProducts = action.preloadProducts;
      newState.filter = action.filter;
      return newState;

    case ACTIONS.PRE_LOAD_PRODUCT_SUCCESS: // preloaded list of products successfully
      newState.preloadProducts = action.preloadProducts;
      newState.filter = action.filter;
      return newState;

    case ACTIONS.ADD_PRE_LOAD_PRODUCT: // add products which were preloaded
      if (newState.preloadProducts && newState.preloadProducts.length > 1) {
        newState.showingProducts = newState.showingProducts.concat(newState.preloadProducts);
        newState.preloadProducts = [];
      }
      return newState;

    default:
      return state;
  }
}