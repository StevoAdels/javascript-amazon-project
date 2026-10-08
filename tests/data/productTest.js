import { products, Product, Clothing, Appliance} from "../../data/products.js";

describe('Test suite: Product', () => {
    it('has correct properties and methods', () => {
        const product = new Product ({
            id: '123',
            name: 'basketball',
            priceCents: 4095
        });
        expect(product.name).toEqual('basketball');
        expect(product.extraInfoHTML()).toEqual('');
        expect(product.getPrice()).toEqual('$40.95')
    });
});

describe('Test suite: Appliance', () => {
    it ('', () => {
    const warrantyLink = "images/appliance-warranty.png"
    const instructionsLink = "images/appliance-instructions.png" 
      const product = new Appliance ({
        id: '124',
    warrantyLink,
    instuctionsLink: instructionsLink,
    priceCents: 2000,
    rating: {
      stars: 4.5,
      count: 87
    }
    });
    expect(product.warrantyLink).toEqual(warrantyLink);
    expect(product.rating.stars).toEqual(4.5);
    expect(product.getPrice()).toEqual('$20.00');
    expect(product.extraInfoHTML()).toContain('Instructions')
});
});

describe('Test Suite: Clothing', () => {
    it('has correct properties and methods', () => {
        const sizeChartLink = "images/clothing-size-chart.png"
        const product = new Clothing({
    id: 'abc',
    sizeChartLink,
    priceCents: 2000,
    rating: {
      stars: 4.5,
      count: 87
    }
        });
        expect(product.sizeChartLink).toEqual(sizeChartLink)
    });
});