//integreated tests
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage, cart } from '../../data/cart.js';
import { loadProducts, loadProductsFetch } from '../../data/products.js';
describe('test suite:ordersummarytest', () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";//out the scope
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
 /*beforeAll((done)=>{
  loadProducts(()=>{
    done();
  });*/
  beforeAll((done)=>{
   loadProductsFetch().then(()=>{
    done();
   });
 });
  beforeEach(() => {        //hooks method
    spyOn(localStorage, 'setItem');//mocking
    document.querySelector('.js-test-container')//to store our html
      .innerHTML = `
    <div class="js-order"></div>
    <div class="js-payment"></div>`;
    spyOn(localStorage, 'getItem').and.callFake(() => { //mocking and use and.callfake() to return defaultvalues
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }]);  //to get emptycart by mocking the getitem
    });
    loadFromStorage();

    renderOrderSummary();
  });

  it('display the cart', () => {

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

    document.querySelector('.js-test-container')
      .innerHTML = '';
  });

  it('remove a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();//after removing product id the paymentordersummary also calls we need provide specific class to container we produce 

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-container-${productId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    document.querySelector('.js-test-container')
      .innerHTML = '';

  });
});