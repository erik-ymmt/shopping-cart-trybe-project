const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
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
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const insertAvailableProducts = async () => {
  const itemsGroup = document.querySelector('.items');
  const data = await fetchProducts('computador');
  const allProducts = data.results;
  allProducts.forEach((product) => itemsGroup.appendChild(createProductItemElement(product)));
};

const getIDFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListenerDelete = (event) => {
  const cart = document.querySelector('.cart__items');
  cart.removeChild(event.target);
  saveCartItems(cart.innerHTML);
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
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
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
      const cart = document.querySelector('.cart__items');
      cart.appendChild(newItemOnCart);
      saveCartItems(cart.innerHTML);
    });
  });
};

window.onload = () => { 
  addProductOnCart();
  getSavedCartItems();
  cartItemClickListener();
};
