require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('should be a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it("should call fetch with the correct url with 'computador' as argument", async () => {
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith(url);
  });
  it("should return the correct object with 'computador' as argument", async () => {
    const fetchProductsComputador = await fetchProducts('computador');
    expect(fetchProductsComputador).toEqual(computadorSearch);
  });
  it("should return error with no argument", async () => {
    const emptyFetchProducts = await fetchProducts();
    expect(emptyFetchProducts).toEqual(new Error('You must provide an url'));
  });
});
