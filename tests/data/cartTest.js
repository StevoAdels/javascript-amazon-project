import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('Test suite: Add to Cart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    })
    it('adds a new product to the cart', () => {
        
        const cartItem = JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }
        ])
       spyOn(localStorage, 'getItem').and.callFake(() => {
        return  cartItem
       });
       loadFromStorage();
       addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
       expect(cart.length).toEqual(1);
       expect(cart[0].quantity).toEqual(3);
       expect(localStorage.setItem).toHaveBeenCalledTimes(1);
       expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
       expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: cart[0].quantity,
                deliveryOptionId: '1'
            }
        ]))
    });

    it('adds a new product to the cart', () => {
         
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
     
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '2');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: cart[0].quantity,
            deliveryOptionId: '1'

        }]))
    });
});

describe('Test Suite: Remove from Cart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(() => {
        spyOn(localStorage, 'setItem');

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
    })

    it('Remove a productId that is in the cart', () => {
        removeFromCart(productId1);  
        expect(cart.length).toEqual(1);
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
            [{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
    }]
        ));
        expect(localStorage.getItem).toHaveBeenCalledWith('cart')
    });
    it('Remove a productId that is not in the cart', () => {
        removeFromCart('7890');
        expect(cart.length).toEqual(2);
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
            [{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
    },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
    }]
        ));
    });

});

describe('Test Suite: UpdateDeliveryOption', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(() => {
        spyOn(localStorage, 'setItem');

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
    })
    it('Updates the deliveryOption', () => {
        updateDeliveryOption(productId1, '3');
        expect(cart.length).toEqual(2)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith('cart');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '3'
            }, 
        {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
    }]
        ));
    })

    it('Edge Test case: Update productId that is not in cart', () => {
         updateDeliveryOption('123', '2');
         expect(localStorage.setItem).toHaveBeenCalledTimes(0);
         expect(localStorage.getItem).toHaveBeenCalledTimes(1);
         expect(localStorage.getItem).toHaveBeenCalledWith('cart')
    });
});