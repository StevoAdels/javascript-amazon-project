import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart-class.js';
// import '../data/backend-practice.js'
// import '../data/car.js'

Promise.all([
     new Promise ((resolve) => {
    console.log('start loading')
    loadProducts(() => {
        console.log('finished loading')
        resolve('value 1')
    });
}),
    new Promise ((resolve) => {
        loadCart(() => {
            resolve('value 2')
        })
    })
]).then((values) => {
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
});
/*
 new Promise ((resolve) => {
    console.log('start loading')
    loadProducts(() => {
        console.log('finished loading')
        resolve('value 1')
    });
}).then((value) => {
    console.log('next step')
    console.log(value)
    return new Promise ((resolve) => {
        loadCart(() => {
            resolve()
        })
    })
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary()
    })
});*/

