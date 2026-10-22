import { cart } from '../../data/cart-class.js';
import { products, getProduct} from '../../data/products.js'
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';





export function renderOrderSummary(){
  const orderSummary = document.querySelector('.js-order-summary');
  if (cart.cartItems.length === 0){
    displayEmptyCart()
    return;
  }

cart.updateCheckoutItem();
let cartSummaryHTML = ''; 

cart.cartItems.forEach((cartItem) => {
   const productId = cartItem.productId; 

   const matchingProduct =  getProduct(productId);

 const deliveryOptionId = cartItem.deliveryOptionId;
 const deliveryOption = getDeliveryOption(deliveryOptionId)

 
const dateString = calculateDeliveryDate(deliveryOption)

cartSummaryHTML += `
<div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                  ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="js-product-quantity-${matchingProduct.id} product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-product-id = "${matchingProduct.id}">
                    Update
                  </span>
                  <input class ="input-quantity js-quantity-input" id = ${matchingProduct.id} data-product-id = ${matchingProduct.id}>
                  <span class ="link-primary save-quantity-link js-save-quantity-link" data-product-id = "${matchingProduct.id}">Save</span>
                  <span class=" js-delete-link-${matchingProduct.id} delete-quantity-link link-primary js-delete-quantity" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                  <p class = "js-warn"></p>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
`
})


document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;



function displayEmptyCart (){
  
    const displayEmptyCart = `
    <div class="empty-cart-container js-empty-cart-container">
          <div class="empty-cart-message">
            <p>Your cart is empty.</p>
            </div>
            
            <a href="amazon.html" class="button-primary">
              View products
            </a>
          </div>
       
    `

  

  if (cart.cartItems.length === 0) {
    orderSummary.innerHTML = displayEmptyCart;
    
    renderPaymentSummary()
    cart.updateCheckoutItem();
  }


}



function deliveryOptionsHTML (matchingProduct, cartItem){
  let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents 
      === 0
      ? 'FREE'
      : `$${ formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId; 
      


      html += `<div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}">
                  <input type="radio"
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`
    })

    return html;
}


document.querySelectorAll('.js-delete-quantity').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
        const {productId} = deleteButton.dataset
        cart.removeFromCart(productId);
        
        displayEmptyCart()
        cart.updateCheckoutItem();
        renderPaymentSummary();
        renderOrderSummary();
    })
});

document.querySelectorAll('.js-update-quantity').forEach((updateButton) => {
  updateButton.addEventListener('click', () => {
    const {productId} = updateButton.dataset
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  })
})

document.querySelectorAll('.js-save-quantity-link').forEach((saveButton) => {
  saveButton.addEventListener('click', () => {
    const inputValue = document.querySelector('.js-quantity-input');
    const valueInput = Number(inputValue.value);
    
    const {productId} = saveButton.dataset
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
    cart.updateSaveQuantity(productId, valueInput);
    cart.updateCheckoutItem();
    renderPaymentSummary();
    inputValue.value = '';
   
  })
  
  })

  document.querySelectorAll('.js-quantity-input').forEach( (inputEvent) => {
    inputEvent.addEventListener('keydown', (event) => {
      const {productId} = inputEvent.dataset
      const inputValue = document.querySelector('.js-quantity-input');
      const valueInput = Number(inputValue.value);
     
      if (event.key === 'Enter'){
        cart.updateSaveQuantity(productId, valueInput)
        cart.updateCheckoutItem();
         const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.remove('is-editing-quantity');
          renderPaymentSummary();
      }
      inputValue.value = '';
    })
    
  })

document.querySelectorAll('.js-delivery-option').forEach((element) => {
element.addEventListener('click', () => {
  const {productId, deliveryOptionId} = element.dataset
    cart.updateDeliveryOption(productId, deliveryOptionId)
    renderOrderSummary();
    renderPaymentSummary();
  })
})

}

