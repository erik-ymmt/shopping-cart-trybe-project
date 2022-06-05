const creatUrlIds = (productID) => `https://api.mercadolibre.com/items/${productID}`;

const fetchItem = async (productID) => {
  if (productID === undefined) return new Error('You must provide an url');
  const response = await fetch(creatUrlIds(productID));
  const item = await response.json();
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
