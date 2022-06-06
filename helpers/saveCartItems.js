const saveCartItems = async (cartGroup) => {
  localStorage.setItem('cartItems', cartGroup);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
