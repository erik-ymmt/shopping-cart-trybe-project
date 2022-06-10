const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('should call localStorage.getItem when <ol><li>Item</li></ol> is the argumenet', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });
  it("should call localStorage.getItem when 'cartItems' is the argumenet", () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
