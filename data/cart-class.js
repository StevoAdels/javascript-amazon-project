class Cart {
    cartItems;
    #localStorageKey;

    constructor (localStorageKey){
        this.#localStorageKey = localStorageKey;

        this.#loadFromStorage();


    };

    #loadFromStorage (){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));


if (!this.cartItems){
    this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
            }];

        }

      };

    saveToLocalStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    };

    addToCart (productId, quantity){
  let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if (matchingItem){
      matchingItem.quantity += quantity;
    }  else {

    this.cartItems.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    }); 
  }
  
  this.saveToLocalStorage();

 };
 
 removeFromCart (productId){
  const newCart = []
  this.cartItems.forEach((cartItem) => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  this.cartItems = newCart;
  this.saveToLocalStorage();
 };

  updateCheckoutItem (){
  let displayQuantity = 0;
  this.cartItems.forEach((cartItem) => {
    displayQuantity += cartItem.quantity
  });
  document.querySelector('.js-checkout').innerHTML = `${displayQuantity} items`
 
 };

updateCartQuantity() {
  let cartQuantity = 0;

  this.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const cartQuantityElement = document.querySelector('.js-cart-quantity');

  if (!cartQuantityElement) {
    return;
  }

  if (cartQuantity === 0) {
    cartQuantityElement.innerHTML = '';
  } else {
    cartQuantityElement.innerHTML = `${cartQuantity}`;
  }
}

 updateSaveQuantity(productId, valueInput){

      
    let matchingItem;
    document.querySelector('.js-warn').innerHTML = '';
    const errorMessage = document.querySelector('.js-warn')
      this.cartItems.forEach((cartItem) => {
        
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
  
       
        this.saveToLocalStorage();
      };

      updateDeliveryOption (productId, deliveryOptionId){
      let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });
        if (matchingItem && deliveryOptionId >= 1 && deliveryOptionId <= 3){
        matchingItem.deliveryOptionId = deliveryOptionId;

        
        } else {
          return;
        }

        this.saveToLocalStorage();
    }


}






export const cart = new Cart('cart-oop');


export function loadCart (fun){
  const xhr = new XMLHttpRequest;

  xhr.addEventListener('load', () => {
      
  console.log('load cart')
fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
};






 

