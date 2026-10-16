import { cart } from "./cart-class.js";
import { calculateDeliveryTime, deliveryOptions } from "./deliveryOptions.js";
import { getProduct, products, loadProductsFetch } from "./products.js";
import { formatCurrency } from "../scripts/utils/money.js";



export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder (order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

async function loadPage(){
try{
    await loadProductsFetch()
} 
catch(error){
    console.log('error loading the page')
}
orderPage()

}
loadPage()
function orderPage(){
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
 


    product.forEach((productItems) => {
       products.forEach((productsItems) => {
    if (productsItems.id ===productItems.productId ){
        matchingItem = productsItems

    }
// date needed to be included in code  
 

    date = new Date(productItems.estimatedDeliveryTime).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
 })
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
                Arriving on: ${calculateDeliveryTime(productItems)}
              </div>
              <div class="product-quantity">
                Quantity: ${productItems.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
  
          
       
            `
            
 }) 


    return html;
}


}

console.log(orders)