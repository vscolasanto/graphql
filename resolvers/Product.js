const { currencyBRL } = require('../data/utils');

module.exports = {
  discountPrice(product) {
    return currencyBRL(product.price - product.price * (product.discount / 100));
  },
};
