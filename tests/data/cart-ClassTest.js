import { cart } from "../../data/cart-class.js";

describe('Test suite: Add to Cart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(() => {
        
    })
    it('Adds a product that is not yet in the cart', () => {
        cart.cartItems = [];
        cart.addToCart(productId1, 2);
        expect(cart.cartItems.length).toEqual(1)
        expect(cart.cartItems[0].productId).toEqual(productId1)
    });
    it('adds a product that is already in the cart', () => {
        cart.cartItems = [
            {
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            }
        ]
        cart.addToCart(productId1, 2)
        expect(cart.cartItems.length).toEqual(1)
        expect(cart.cartItems[0].quantity).toEqual(3)

    })
}); 

describe('Test Suite: Remove from Cart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
   
    it('removes a product that is in the cart', () => {
        cart.cartItems = [
        {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
    },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
    
    }]
    cart.removeFromCart(productId1);
   
    expect(cart.cartItems.length).toEqual(1)
    expect(cart.cartItems[0].productId).toEqual(productId2)
    }) 
    it('removes a productId that is not in the cart', () => {
       cart.cartItems = [{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
    },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
    
    }]
    cart.removeFromCart('123')
    expect(cart.cartItems.length).toEqual(2)
    })
})