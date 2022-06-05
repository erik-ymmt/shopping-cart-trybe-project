const saveCartItems = async (cartGroup) => {
  // const cartGroup = document.querySelector('.cart__items');
  // console.log(cartGroup);
  // const cartGroupString = JSON.stringify(cartGroup);
  localStorage.setItem('cartItems', cartGroup);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
