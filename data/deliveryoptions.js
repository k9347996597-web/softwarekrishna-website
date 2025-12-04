export  const deliveryOptions=[{
  id:'1',
  deliveryDays:7,
  priceCents:0
},
{
    id:'2',
  deliveryDays:3,
  priceCents:499
},
{
    id:'3',
  deliveryDays:1,
  priceCents:999
}];
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption = '';
    deliveryOptions.forEach((Option) => { //now we have only updated cart.deliveryoptionid we need loop through deliveryoptin  get the deliverydays 
      if (Option.id === deliveryOptionId) { //loop runs delivery,option===cart.deliveryoptionid (so we can get delivery days belong specific id)
        deliveryOption = Option;
      }
    });
    return deliveryOption || deliveryOption[0];
}