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

// Opção 1 - quando for mudado o estilo do carrinho
// const calculateTotalPrice = () => {
//   const totalPriceTag = document.querySelector('.total-price');
//   const allPrices = document.querySelectorAll('.product-price');
//   allPricesArray = Array.from(allPrices);
//   const totalPrice = allPricesArray.reduce((total, item) =>
//     total + parseInt(item.innerHTML, 10), 0);
//   console.log(totalPrice);
//   totalPriceTag.innerText = totalPrice;
// };

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
  const cart = document.querySelector('.cart__items');
  cart.removeChild(event.target);
  saveCartItems(cart.innerHTML);
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
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  // li.innerHTML = `ID: ${id}
  // <br>NOME: ${title}
  // <br>PREÇO: $<span class="product-price">${price}</span>`;
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
      calculateTotalPrice();
    });
  });
};

window.onload = () => { 
  addProductOnCart();
  getSavedCartItems();
  cartItemClickListener();
  calculateTotalPrice();
};
