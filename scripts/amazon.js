import { cart, addToCart } from '../data/cart.js'; //add multiple exports using , or use import * as cartmodule from '../data/cart.js ' 
// it group all the exports as object(cartmodule)
//we can use the imports as property,method
import { products,loadProducts } from '../data/products.js';
//import { formatMoney } from './utils.js/money.js';
loadProducts(renderProductsGrid);
function renderProductsGrid(){
let productsHTML = '';
products.forEach((product) => {
  productsHTML += ` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${product.extraInfoHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-product-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`;
  //console.log(productsHTML);
});
document.querySelector('.js-grid')
  .innerHTML = productsHTML;


  function addCartQuantity() {  //always create funtions to easy to read
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;

  });
// console.log(cartQuantity);
//  console.log(cart);

  document.querySelector('.js-cart')
    .innerHTML = cartQuantity;
}

document.querySelectorAll('.js-product-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      addCartQuantity();





    });
  });
};