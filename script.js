const classCartItems = '.cart__items';

const loadingApiText = () => {
  const shoppingSection = document.querySelector('.items');
  const loadingElement = document.createElement('p');
  loadingElement.className = 'loading';
  loadingElement.innerText = 'carregando...';
  shoppingSection.appendChild(loadingElement);
};

const removeLoadingText = () => {
  const shoppingSection = document.querySelector('.items');
  const loadingElement = document.querySelector('.loading');
  shoppingSection.removeChild(loadingElement);
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createProductImageContainer = () => {
  const imgContainer = document.createElement('div');
  imgContainer.className = 'item__image-container';
  return imgContainer;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageContainer())
    .appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const insertAvailableProducts = async () => {
  const itemsGroup = document.querySelector('.items');
  const data = await fetchProducts('computador');
  removeLoadingText();
  const allProducts = data.results;
  allProducts.forEach((product) => itemsGroup.appendChild(createProductItemElement(product)));
};

const getIDFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const calculateTotalPrice = () => {
  const totalPriceTag = document.querySelector('.total-price');
  const cart = document.querySelectorAll('.cart__item');
  const cartArray = Array.from(cart);
  const totalPrice = cartArray.reduce((total, currentProduct) => {
    const currentPrice = currentProduct.innerText.split('$')[1];
    return total + parseFloat(currentPrice);
  }, 0);
  totalPriceTag.innerHTML = Math.round(totalPrice * 100) / 100;
};

const cartItemClickListenerDelete = (event) => {
  const cartItems = document.querySelector(classCartItems);
  cartItems.removeChild(event.target);
  saveCartItems(cartItems.innerHTML);
  calculateTotalPrice();
};

const cartItemClickListener = () => {
  const cart = document.querySelectorAll('.cart__item');
  cart.forEach((item) => {
    item.addEventListener('click', cartItemClickListenerDelete);
  });  
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `<hr><b>ID:</b> ${id}
  <br><b>Item:</b> ${title}
  <br><b>Preço:</b> R$${price}`;
  li.addEventListener('click', cartItemClickListenerDelete);
  return li;
};

const addProductOnCart = async () => {
  await insertAvailableProducts();
  const itemsGroup = document.querySelector('.items');
  const selectShopBtn = itemsGroup.querySelectorAll('button');
  selectShopBtn.forEach((element) => {
    element.addEventListener('click', async (event) => {
      const productId = getIDFromProductItem(event.target.parentElement);
      const product = await fetchItem(productId);
      const newItemOnCart = createCartItemElement(product);
      const cartItems = document.querySelector(classCartItems);
      cartItems.appendChild(newItemOnCart);
      saveCartItems(cartItems.innerHTML);
      calculateTotalPrice();
    });
  });
};

const emptyCart = () => {
  const cartItems = document.querySelector(classCartItems);
  const emptyCartBtn = document.querySelector('.empty-cart');
  emptyCartBtn.addEventListener('click', () => {
    cartItems.innerHTML = '';
    localStorage.setItem('cartItems', '');
    calculateTotalPrice();
  });
};

window.onload = () => { 
  loadingApiText();
  addProductOnCart();
  getSavedCartItems();
  cartItemClickListener();
  calculateTotalPrice();
  emptyCart();
};
