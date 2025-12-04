import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


//import "../data/cart-class.js";
//import '../data/backend-practice.js';
//let us control the asynchronouscode 

//async=better way to handle asunchronous code than promise and callbacks

async function loadPage() {// async = makes a function return promise
  //console.log('load page');

  //errorhandling in async wait
  try{
    //throw 'error1';
     await loadProductsFetch(); //wait for promise to finsh ,,,,should present inside async and beside async funtion

  await new Promise((resolve,reject) => {
    loadCart(() => {
      //reject(); //to create error in future
      resolve(); //no value pass=undefined
    });
  });
  }catch(error){
    console.log('plse')
  }

  renderOrderSummary();
  renderPaymentSummary();
  return 'value';
}
loadPage();
/*.then((value) => {
  console.log('next');
  console.log(value)
});*/






/*new Promise(()=>{
  console.log('promise');//runs immediately inner funtion
 })*/

//resolve()=let us control when to go nextstep

//promise.all()== to run multiple promise at a same time



/*
//promise with xml request
Promise.all([
  new Promise((resolve) => {

  loadProducts(() => {

    resolve('value1'); //to go to next step,also pass the value
  });
}),
*/





/*
//promise with fetch()

Promise.all([
  loadProductsFetch(), //fecth always gives a new promise so we dont need create a new promise() we can directly call the that fetch funtion


new Promise((resolve)=> {
    loadCart(() => {
      resolve(); //no value pass=undefined
    });
  })

]).then((value)=>{ //acess the value as parameter
  console.log(value)
  renderOrderSummary();
  renderPaymentSummary();
})
  */




/*
new Promise((resolve) => {

  loadProducts(() => {

    resolve(); //to go to next step and help to wait the promise() to execute first
  });
  
}).then(() => {
  return new Promise((resolve)=> { //to add new promise after using then()
    loadCart(() => {
      resolve();
    })
  });

}).then(() => {   //to add nextstep to promise
  renderOrderSummary();
  renderPaymentSummary();
})*/





/*loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  })

});
*/