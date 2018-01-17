import {Configuration, CommonHelper} from '../commons/configuration';

class ProductService {

  // get products from server with a sort order
  async sortProducts(sort) {
    let requestURL = Configuration.URL + 'products?';
    requestURL += '_page=1' + '&_limit=' + (Configuration.PAGE_LIMIT);
    if (sort) {
      requestURL += '&_sort=' + sort;
    }
    let receiveProducts = await executeGet(requestURL);
    let totalRows = await this.getTotalRows();
    if (receiveProducts === null) return null;
    let finalProducts = receiveProducts.map(p => {
      p.priceDisplay = CommonHelper.formatPrice(p.price);
      p.dateDisplay = CommonHelper.formatDate(p.date);
      return p;
    });
    return {
      products: finalProducts,
      totalRows
    }
  }

  // get products from server
  async getProducts(page, sort) {
    page = page || 1;
    let requestURL = Configuration.URL + 'products?';
    requestURL += '_page=' + page + '&_limit=' + Configuration.PAGE_LIMIT;
    if (sort) {
      requestURL += '&_sort=' + sort;
    }
    let receiveProducts = await executeGet(requestURL);
    let totalRows = await this.getTotalRows();
    if (receiveProducts === null) return null;
    let finalProducts = receiveProducts.map(p => {
      p.priceDisplay = CommonHelper.formatPrice(p.price);
      p.dateDisplay = CommonHelper.formatDate(p.date);
      return p;
    });
    return {
      products: finalProducts,
      totalRows
    }
  }

  async getTotalRows() {
    return 500;
  }
}

const ProductServiceInstance = new ProductService();
export default ProductServiceInstance;

const executeGet = async (url) => {
  try {
    let result = await fetch(url, {
      method: 'GET',
    });
    if (result.ok) {
      return await result.json();
    }
    else {
      return null;
    }
  }
  catch (e) {
    throw e;
  }
};