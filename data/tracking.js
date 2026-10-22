import { orders } from "./orderButton.js";
import { loadProductsFetch, products } from "./products.js";
import { cart } from "./cart-class.js";
import { displayDate } from "../scripts/checkout/weekend.js";
import {calculateDeliveryTime} from './deliveryOptions.js'

loadTrackingPage();
async function loadTrackingPage(){
    try {
        await loadProductsFetch();
    } 
    
    catch (error) {
        console.error('Error loading tracking data:', error);
    }
    cart.updateCartQuantity();
    loadTrackingData();
}

function loadTrackingData(){
  if(orders.length === 0){
    const trackingContainer = document.querySelector('.js-order-tracking');
    trackingContainer.innerHTML = `
    <div class="empty-cart-container js-empty-cart-container">
          <div class="empty-cart-message">
            <p>You have no orders to track.</p>
            <a href="orders.html" class="button-primary">
              View orders
            </a>
            </div>
    `
    return;
  }
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    
    let trackingHTML = '';

    const orderItem = orders.find((order) => order.id === orderId);
    const orderProduct = orderItem.products.find((orderProducts) => orderProducts.productId === productId);
    const matchingProducts = products.find((product) => product.id === productId);
    const quantity = orderProduct.quantity;

    const days = displayDate(orderItem, orderProduct);
    
    const deliveredDate = calculateDeliveryTime(days, orderItem);
    const dateString = deliveredDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
    })
trackingHTML = `
   <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dateString}
        </div>

        <div class="product-info">
          ${matchingProducts.name}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${matchingProducts.image}">

        <div class="progress-labels-container">
          <div class="progress-label js-preparing-label">
            Preparing
          </div>
          <div class="progress-label js-">
            Shipped
          </div>
          <div class="progress-label js-delivered-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      
`

 const trackingContainer = document.querySelector('.js-order-tracking');
 
 trackingContainer.innerHTML = trackingHTML;
  
 if(trackingContainer){
 trackingProgressBar(orderItem, deliveredDate);
 return;
}
}

function trackingProgressBar(orderItem,deliveryDate ){
  const orderTime = new Date(orderItem.orderTime);
  const deliveredDate = new Date(deliveryDate);
  const currentDate = new Date();
  const totalTime = deliveredDate - orderTime;
  const elapsedTime = currentDate - orderTime;
  const progressPercentage = Math.min(100, Math.max(0,
  Math.ceil((elapsedTime / totalTime) * 100)
));

 
  
  document.querySelector('.progress-bar').style.width = `${progressPercentage}%`;


}