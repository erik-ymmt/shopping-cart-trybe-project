const creatUrlIds = (urlKey) => `https://api.mercadolibre.com/items/${urlKey}`;

const fetchItem = async (urlKey) => {
  await fetch(creatUrlIds(urlKey));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
