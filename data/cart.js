export let cart;
loadFromStorage();
  export function loadFromStorage (){
        cart = JSON.parse(localStorage.getItem('cart'));


if (!cart){
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
    
}
      }


export function saveToLocalStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart (productId, quantity){
  let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if (matchingItem){
      matchingItem.quantity += quantity;
    }  else {

    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    }); 
  }
  
  saveToLocalStorage();
 }


 export function updateCheckoutItem (){
  let displayQuantity = 0;
  cart.forEach((cartItem) => {
    displayQuantity += cartItem.quantity
  });
  document.querySelector('.js-checkout').innerHTML = `${displayQuantity} items`
  updateSaveQuantity();
 }

 export function removeFromCart (productId){
  const newCart = []
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToLocalStorage();
 }


  
  export function updateSaveQuantity(productId, valueInput){

      let cartQuantity = 0;
    let matchingItem;
    document.querySelector('.js-warn').innerHTML = '';
    const errorMessage = document.querySelector('.js-warn')
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
        if (productId === cartItem.productId){
        matchingItem = cartItem;
        }

      })
       if (matchingItem){
        if (valueInput > 0 && valueInput < 1000){
        matchingItem.quantity = valueInput;
        document.querySelector('.js-warn').innerHTML = '';
         
         document.querySelector('.js-quantity-label').innerHTML = `${valueInput}`
         
       }
        else {
        
       errorMessage.classList.add('error-message');
        errorMessage.innerHTML = 'Please input a number between zero and one thousand'
        return;
       }
      }
  
       
        saveToLocalStorage();
      };

  export  function updateDeliveryOption (productId, deliveryOptionId){
      let matchingItem;
        cart.forEach((cartItem) => {
            if (productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        saveToLocalStorage();
    }
