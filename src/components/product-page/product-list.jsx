import React from 'react';
import store from './_store';
import {preloadProduct, addPreloadProduct, sortProduct} from "./_actions";
import Waypoint from 'react-waypoint';
import {Configuration} from "../../commons/configuration";

class ProductList extends React.Component {
  listAdsKeys; // Contains all loaded ads key

  constructor(props) {
    super(props);
    this.listAdsKeys = [];
  }

  // Render header with sort
  renderHeader(text, sort) {
    return (
      <div>
        <a onClick={() => this.handleSort(sort)}>{text}</a>
        {this.props.filter.sort === sort && <span>*</span>}
      </div>
    );
  }

  // Render Ads Section
  renderAdsSection(key) {
    let randomKey = 0;
    let adKey = 0;
    let fetchTimes = 0;
    if (key < this.listAdsKeys.length) {
      randomKey = this.listAdsKeys[key].randomKey;
    } else {
      do {
        randomKey = Math.floor(Math.random() * 1000);
        adKey = (randomKey % 10) + 1;
        fetchTimes++;
      }
      while (this.listAdsKeys.length > 0 && adKey === this.listAdsKeys[this.listAdsKeys.length - 1].adKey && fetchTimes < 1000);
      this.listAdsKeys.push({
        randomKey: randomKey,
        adKey: adKey
      });
    }
    return (<tr>
      <td colSpan={4} align={"center"}>
        <img src={"/ads/?r=" + randomKey}/>
      </td>
    </tr>)
  }

  // Handle click sort button
  handleSort(sort) {
    if (sort !== this.props.filter.sort) {
      let filter = Object.assign({}, this.props.filter);
      filter.sort = sort;
      filter.page = 1;
      store.dispatch(sortProduct(filter));
    }
  }

  // Handle load more products when scroll down
  handleLoadMore() {
    if (this.isOutOfProducts() || this.props.isFirstFetch) return;
    if (!this.props.isLoading) {
      let filter = Object.assign({}, this.props.filter);
      filter.page = (this.props.filter.page || 1) + 1;
      store.dispatch(addPreloadProduct());
      store.dispatch(preloadProduct(filter));
    }
  }

  // Check if all products are loaded
  isOutOfProducts() {
    return (this.props.filter.page || 1) * Configuration.PAGE_LIMIT > this.props.filter.totalRows;
  }

  render() {
    return (
      <div className={"product-container"}>
        <div>
          <table border={1}>
            <thead>
            <tr>
              <th width={260}>
                {this.renderHeader("Id", "id")}
              </th>
              <th width={340}>
                {this.renderHeader("Size", "size")}
              </th>
              <th width={100}>
                {this.renderHeader("Price", "price")}
              </th>
              <th width={100}>
                Date Time
              </th>
            </tr>
            </thead>
            {this.props.products && this.props.products.length > 1 && this.props.products.map((product, index) => {
                return (
                  <tbody key={index}>
                  <tr>
                    <td>
                      {product.id}
                    </td>
                    <td style={{fontSize: product.size || 13}}>
                      {product.face}
                    </td>
                    <td align={"center"}>
                      {product.priceDisplay}
                    </td>
                    <td align={"center"}>
                      {product.dateDisplay}
                    </td>
                  </tr>
                  {index > 0 && ((index + 1) % 20) === 0 && this.renderAdsSection(Math.floor(index / 20))}
                  </tbody>
                );
              }
            )}
            <tbody>
            {
              (!this.props.isFirstFetch && this.isOutOfProducts()) &&
              <tr>
                <td colSpan={4} align={"center"}>
                  ~ end of catalogue ~
                </td>
              </tr>
            }
            {this.props.isLoading && <tr>
              <td colSpan={4} align={"center"}>
                <div>loading...</div>
              </td>
            </tr>}
            </tbody>
          </table>
        </div>
        <div className={"waypoint-container"}>
          <div className={"waypoint"}>
            <Waypoint onEnter={() => this.handleLoadMore()}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
