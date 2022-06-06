const getSavedCartItems = () => {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart !== undefined) {
    document.querySelector('.cart__items').innerHTML = savedCart;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
