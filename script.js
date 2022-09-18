const classCartItems = '.cart__items';

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const loadingApiText = () => {
  const shoppingSection = document.querySelector('.items');
  const loadingElement = createCustomElement('p', 'loading', 'carregando...');
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

const formatPrices = (originalPrice) =>
  Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(originalPrice);

const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createProductImageContainer())
    .appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${formatPrices(price)}`));
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
  const totalPrice = cartArray.reduce((total, currentItem) => {
    currentPrice = parseFloat(currentItem.lastChild.innerText);
    return total + currentPrice;
  }, 0);
  const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
  totalPriceTag.innerHTML = formatPrices(roundedTotalPrice);
  return formatPrices(roundedTotalPrice);
};

const controlCartStyle = () => {
  const cartItems = document.querySelector(classCartItems);
  if (cartItems.innerHTML.length === 0) cartItems.style.border = '0';
};

const deleteCartItem = (event) => {
  const cartItems = document.querySelector(classCartItems);
  cartItems.removeChild(event.target.parentElement);
  saveCartItems(cartItems.innerHTML);
  calculateTotalPrice();
};

const cartItemClickListener = () => {
  const cartDeleteIcon = document.querySelectorAll('.delete-from-cart');
  cartDeleteIcon.forEach((item) => {
    item.addEventListener('click', deleteCartItem);
  });  
};

const updateInfos = () => {
  calculateTotalPrice();
  cartItemClickListener();
  controlCartStyle();
};

const loadCartLocalStorage = () => {
  savedCart = getSavedCartItems();
  if (savedCart !== undefined) {
    document.querySelector('.cart__items').innerHTML = savedCart;
  }
};

const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  const shortTitle = `${title.split(' ')[0]} ${title.split(' ')[1]}`;
  li.className = 'cart__item';
  li.innerHTML = `<hr>
  <img class="cart-thumbnails" src="${thumbnail}">
  <span class="item__sku">ID: ${id}</span>
  ${shortTitle}
  <br><b>Preço:</b> R$${formatPrices(price)}
  <button class="delete-from-cart">x</button>
  <span class="item__unformated_price">${price}</span>`;
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
      updateInfos();
    });
  });
};

const emptyCart = () => {
  const cartItems = document.querySelector(classCartItems);
  const emptyCartBtn = document.querySelector('.empty-cart');
  emptyCartBtn.addEventListener('click', () => {
    cartItems.innerHTML = '';
    localStorage.setItem('cartItems', '');
    updateInfos();
  });
};

const finishShopSimulation = () => {
  const finishBtn = document.getElementById('buy-btn');
  finishBtn.addEventListener('click', () => {
    const totalPrice = calculateTotalPrice();
    if (totalPrice[0] === '0') {
      alert('Adicione itens ao carrinho');
    } else {
      alert(`Compra efetuada com sucesso! Valor R$${totalPrice}`);
    }
  });
};

const checkScreen = () => {
  console.log(window.innerWidth);
  if (window.innerWidth < 650) {
    alert('Esse site não é compatível na versão mobile, por favor utilize no desktop, obrigado. - Erik');
  }
};

window.onload = () => { 
  checkScreen();
  loadingApiText();
  addProductOnCart();
  loadCartLocalStorage();
  cartItemClickListener();
  emptyCart();
  updateInfos();
  finishShopSimulation();
};
