require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('should be a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it("should call fetch with the correct endpoint with 'MLB1615760527' as argument", async () => {
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith(url);
  });
  it("should return the expected result when called with 'MLB1615760527' as argument", async () => {
    const received = await fetchItem('MLB1615760527');
    expect(received).toEqual(item);
  });
  it("should return error with no argument", async () => {
    const emptyFetchItem = await fetchItem();
    expect(emptyFetchItem).toEqual(new Error('You must provide an url'));
  });
});
