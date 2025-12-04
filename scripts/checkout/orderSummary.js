import { cart, removeCart, updateDeliveryOption } from '../../data/cart.js';
import { products,getProduct } from '../../data/products.js';
import { formatMoney } from '../utils.js/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';



export function renderOrderSummary() {
  let cartSummaryHtml = "";
  cart.forEach((cartItem) => {  //suppose if the cart has default values with (id) and quantity 

    const productId = cartItem.productId;
    console.log(productId);

    //but we need to get all the product details to show in cart summary(page)
    const matchingItem =getProduct(productId);
   // console.log(matchingItem);
    //console.log(matchingItem instanceof Product);
    //console.log(typeof matchingItem[0].getPrice)
     //console.log(matchingProduct);
    // now the matchproduct have all values of product 
    const deliveryOptionId = cartItem.deliveryOptionId;//cart.deliveryoptionid changes when click new radio button
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd,MMMM D');
    //generate html
    cartSummaryHtml += ` <div class="cart-item-container
    js-cart-item-container 
js-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingItem.name}
                </div>
                <div class="product-price">
                  ${matchingItem.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingItem.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete js-delete-link-${matchingItem.id}" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                
                ${deliveryOptionHtml(matchingItem, cartItem)}
              </div>
            </div>
          </div>
 `;
  });
  function deliveryOptionHtml(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd,MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `${formatMoney(deliveryOption.priceCents)}`
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;//to make radio button to check
      html +=
        `
                <div class="delivery-option js-delivery-option"
                 data-product-id="${matchingProduct.id}"
                 data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}- Shipping
                    </div>
                  </div>
                </div>
              `
    });
    return html;
  }
  //console.log(cartSummaryHtml);
  document.querySelector('.js-order')    //show the html using dom
    .innerHTML = cartSummaryHtml;




  document.querySelectorAll('.js-delete') //here we have many delete buttons we need add eventlisteners for every delete button
    .forEach((link) => { // loop through every button 
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;// to know which product we need to delete we need add data property to delete button to produce (id)
        removeCart(productId);// the same product id ignored remaining item present in cart will show  ( if we use console)


        const container = document.querySelector( //here we need to know what type of container we need to delete so add data att to the container 
          `.js-container-${productId}`     //now we pass the product id to remove entire html in that specific container(using backtics)

        );
        container.remove();
        renderPaymentSummary();


      });

    });
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId); //update cart.deliveryoptionid with deliveryoptions.id
        renderOrderSummary();
        renderPaymentSummary();
      })
    })
}
