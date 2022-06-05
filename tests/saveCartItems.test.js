const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('should call localStorage,setItem when <ol><li>Item</li></ol> is the argumenet', async () => {
    await saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
    expect(localStorage.setItem).toBeCalledWith(cartItems, '<ol><li>Item</li></ol>');
  });
});
