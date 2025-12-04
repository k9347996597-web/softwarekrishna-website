class Cart {
  cartItems;    //filed===property
  #localStorageKey;//privtae property or field

  constructor(localStorageKey) { //used to run setup code everytime we create object
    this.#localStorageKey = localStorageKey;// this points the object we genrate


    this.#loadFromStorage();
    
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));//retrive data
    if (!this.cartItems) {
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d607eb678c",
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }];
    };
  }
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));//save the data
  }

  addToCart(productId) {  //here productid is passed as parameter because the productid is outside of the fuvtion scope 
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }
  removeCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (productId !== cartItem.productId) {//here the productid we pass ignored remaining all items  in cart will add to newcart
        newCart.push(cartItem);        // now new cart have all properties of cart
      }
    });               //now the cart have every items present in newcart except the the productid we pass
    this.cartItems = newCart;   // now we need to reattach new cart to cart 
    this.saveToStorage();
  }//update delivey date when we change date through radio button 
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) { //if same productid 
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;// but deliveryoptionID in cart changes 
    this.saveToStorage();// now the cart have new deliveryoption id 
  }



}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e')

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);






