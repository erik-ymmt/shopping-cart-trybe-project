const getSavedCartItems = () => {
  const savedCart = localStorage.getItem('cartItems');
  document.querySelector('.cart__items').innerHTML = savedCart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
