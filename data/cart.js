
export let cart;
loadFromStorage()
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));//retrive data
  if (!cart) {
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }];
  };
}
//use export to use this variable outside of this file

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));//save the data
}
export function addToCart(productId) {  //here productid is passed as parameter because the productid is outside of the fuvtion scope 
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();




};

export function removeCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {//here the productid we pass ignored remaining all items  in cart will add to newcart
      newCart.push(cartItem);        // now new cart have all properties of cart
    }
  });               //now the cart have every items present in newcart except the the productid we pass
  cart = newCart;   // now we need to reattach new cart to cart 
  saveToStorage();
};
//update delivey date when we change date through radio button 
//first we need to know productid ,then we can change deliveryoptionId (dataAttributes) 
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) { //if same productid 
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;// but deliveryoptionID in cart changes 
  saveToStorage();// now the cart have new deliveryoption id 
};

 export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
   console.log(xhr.response);
      fun();
    });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
};