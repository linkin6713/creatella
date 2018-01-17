import React from 'react';
import ProductList from '../components/product-page/product-list';
import store from '../components/product-page/_store';
import {firstLoadProduct} from "../components/product-page/_actions";
import {preloadProduct} from "../components/product-page/_actions";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingProducts: [],
      isLoading: false,
      isFirstFetch: true,
      filter: {},
    }
  }

  componentWillMount() {
    store.subscribe(async () => {
      let state = store.getState();
      this.setState({
        showingProducts: state.showingProducts,
        isLoading: state.isLoading,
        isFirstFetch: state.isFirstFetch,
        filter: state.filter,
      });
    });
  }

  componentDidMount() {
    store.dispatch(firstLoadProduct(this.state.filter));
    store.dispatch(preloadProduct(this.state.filter));
  }

  render() {
    return (
        <ProductList products={this.state.showingProducts}
                     isFirstFetch={this.state.isFirstFetch}
                     isLoading={this.state.isLoading}
                     filter={this.state.filter}
        />
    );
  }
}

export default ProductPage;