import { addToCart,cart,loadFromStorage } from "../../data/cart.js";
describe('test:addToCart',()=>{
  it('add an existing product to the cart',()=>{
    spyOn(localStorage,'setItem') //mocking the setitem tom stop the data to save in localstarage
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d607eb678c',
        quantity:1,
        deliveryOptionId:'1'
      }]);  //to get emptycart by mocking the getitem
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d607eb678c');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);//we can still check if the addtocart calls setitem or not
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d607eb678c');
    expect(cart[0].quantity).toEqual(2);
  })
  it('add new product to the cart',()=>{

    //a mock only last for one test thats why we use sypon every test******

    spyOn(localStorage,'setItem') //mocking the setitem tom stop the data to save in localstarage
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);  //to get emptycart by mocking the getitem
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d607eb678c');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);//we can still check if the addtocart calls setitem or not
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d607eb678c');
    expect(cart[0].quantity).toEqual(1);
  })
});