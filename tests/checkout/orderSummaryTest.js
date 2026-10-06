import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart} from "../../data/cart.js";



describe('Test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const deliveryId = '3';
    
    beforeEach(() => {
               spyOn(localStorage, 'setItem');
           document.querySelector('.js-test-container').innerHTML = `
            <div class= "js-order-summary"></div>
            <div class = "js-payment-summary"></div>
            <div class="js-checkout"></div>
           
            
        `
        
            spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
    },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
    }]);
        });
        loadFromStorage();

        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays the cart', () => {
        
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2)
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');
        expect(
            document.querySelector(`.js-product-name-${productId1}`).innerHTML.trim()
        ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs")

    });

    it('removes the product', () => {
 

        document.querySelector(`.js-delete-link-${productId1}`).click()

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null)
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2)

    });

    it('Updates the delivery Option', () => {
        document.querySelector(`.js-delivery-option-${productId1}-${deliveryId}`).click()
        const checkBox = document.querySelector(`.js-delivery-option-input-${productId1}-${deliveryId}`)
        expect(checkBox.checked).toBe(true);
        expect(cart.length).toEqual(2);
        expect(
            document.querySelector('.js-total-payment').innerHTML
        ).toEqual('$63.50')
        expect(
            document.querySelector('.js-shipping-price').innerHTML
        ).toEqual('$14.98')
    });
});
