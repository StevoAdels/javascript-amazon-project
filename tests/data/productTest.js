import { products, Product} from "../../data/products.js";

describe('Test suite: Product', () => {
    it('has correct properties and methods', () => {
        const product = new Product ({
            id: '123',
            name: 'basketball'
        });
        expect(product.name).toEqual('basketball')
    });
});