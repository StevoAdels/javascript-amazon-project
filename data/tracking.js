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
    loadTrackingData();
}

function loadTrackingData(){
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    cart.updateCartQuantity();
    let trackingHTML = '';

    const orderItem = orders.find((order) => order.id === orderId);
    const orderProduct = orderItem.products.find((orderProducts) => orderProducts.productId === productId);
    const matchingProducts = products.find((product) => product.id === productId);
    const quantity = orderProduct.quantity;

    const days = displayDate(orderItem, orderProduct);

trackingHTML = `
   <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${calculateDeliveryTime(days, orderItem)}
        </div>

        <div class="product-info">
          ${matchingProducts.name}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${matchingProducts.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      
`

 document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}