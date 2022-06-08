const createUrlIds = (productID) => `https://api.mercadolibre.com/items/${productID}`;

const fetchItem = async (productID) => {
  if (productID === undefined) return new Error('You must provide an url');
  const url = createUrlIds(productID);
  const response = await fetch(url);
  const item = await response.json();
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
