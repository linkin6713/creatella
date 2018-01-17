export const Configuration = {
  URL: 'http://localhost:3000/', // server URL
  PAGE_LIMIT: 20, // limit products per page
};

export const CommonHelper = {
  // format date to relative time
  formatDate: (date) => {
    let productAddedDate = new Date(date);
    if (!productAddedDate) return '';
    let today = new Date();
    let diff = Math.round((today - productAddedDate) / (1000 * 60 * 60 * 24));
    if (diff < 7) {
      return ( diff + ' days ago');
    }
    return productAddedDate.toLocaleDateString();
  },

  // format cents to USD
  formatPrice: (price) => {
    if (isNaN(price)) return 0;
    let result = price / 1000;
    return result.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 5
    });
  }
};