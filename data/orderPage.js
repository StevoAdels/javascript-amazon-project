import { cart } from "./cart-class.js";
import { calculateDeliveryTime } from "./deliveryOptions.js";
import { products, loadProductsFetch } from "./products.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { orders } from "./orderButton.js";
import {displayDate} from '../scripts/checkout/weekend.js'




export async function loadPage(){
try{
    await loadProductsFetch()
} 
catch(error){
    console.log('error loading the page')
}
cart.updateCartQuantity();
orderPage()

}



function orderPage(){
  if (orders.length === 0){
    const orderContainer = document.querySelector('.js-order-grid');
    orderContainer.innerHTML = `
    <div class="empty-cart-container js-empty-cart-container">
          <div class="empty-cart-message">
            <p>You have no orders.</p>
            </div>
            
            <a href="checkout.html" class="button-primary">
              Go ahead and place an order
            </a>
          </div>
    `
    return;
  }
let orderHTML = '';
orders.forEach((orderItems) => {

 let date = '';
 date = new Date(orderItems.orderTime).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
 })


orderHTML += `
    <div class="order-container">
           
 <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${date}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderItems.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItems.id}</div>
            </div>
          </div>
  <div class="order-details-grid">

    ${renderOrder(orderItems)}
      </div>
  </div>
       
`
});

const orderGrid = document.querySelector('.js-order-grid')

if(orderGrid){
    orderGrid.innerHTML = orderHTML;
} else{
    console.log('couldn\'t find the element')
}
cart.updateCartQuantity()
function renderOrder (orderItems){
    let html = '';
let matchingItem = '';
   let date = '';
    const product = orderItems.products
    let deliveryTime;
    

    product.forEach((productItems) => {
     const days = displayDate(orderItems, productItems)
       const deliveredDate = calculateDeliveryTime(days, orderItems);
    const dateString = deliveredDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
    })
       products.forEach((productsItems) => {
    if (productsItems.id ===productItems.productId ){
        matchingItem = productsItems

    }
// date needed to be included in code  
 


         })
     html += `
  
            <div class="product-image-container">
              <img src="${matchingItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dateString}
              </div>
              <div class="product-quantity">
                Quantity: ${productItems.quantity}
              </div>
              <button class="buy-again-button js-buy-again-button
               button-primary" data-product-id = "${matchingItem.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderItems.id}&productId=${matchingItem.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
  
            `
            
 }) 

 
    return html;

}
document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
        const {productId} = button.dataset;
        cart.addToCart(productId, 1);
        cart.updateCartQuantity()
    });
})
}
    

