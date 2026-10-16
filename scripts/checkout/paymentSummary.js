import {cart} from '../../data/cart-class.js';
import {getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { getDeliveryOption} from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orderButton.js';


export function renderPaymentSummary (){
let productsPriceCents = 0;
let shippingPriceCents = 0;
let cartQuantity = 0;
cart.cartItems.forEach((cartItem) => {
const productId = cartItem.productId
       const product =  getProduct(productId);
       const deliveryOptionId = cartItem.deliveryOptionId;
       const deliveryOption = getDeliveryOption(deliveryOptionId);
      productsPriceCents += product.priceCents * cartItem.quantity
    shippingPriceCents += deliveryOption.priceCents
    cartQuantity += cartItem.quantity
    })

    const totalBeforeTaxCents = productsPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productsPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shipping-price">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-total-payment">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
          `;


    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    
    document.querySelector('.js-place-order').addEventListener('click', async () => {
      try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          cart: cart.cartItems
          
        })
      })
      const order = await response.json()
      addOrder(order)
 
      } catch (error){
        console.log('Unexpected error: Please try again later')
      }
      
      window.location.href = 'orders.html'
      
         });

}