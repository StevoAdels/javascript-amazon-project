import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct (productId) {
  let matchingProduct;
        products.forEach((product) => {
            if (productId === product.id){
                matchingProduct = product;
            }
        })

        return matchingProduct;
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents
  }

  getStarUrl (){
   return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice (){
    return  `$${formatCurrency(this.priceCents)}`
  }

  extraInfoHTML () {
    return ``;
  }
}

export class Clothing extends Product {
  sizeChartLink;

  constructor (productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink
  }

  extraInfoHTML (){
    return  `
    <a href ="${this.sizeChartLink}" target = "_blank">
    Size Chart
    </a>
    `
  }
}

export class Appliance extends Product {
warrantyLink;
instuctionsLink;

  constructor (productDetails){
    super(productDetails)
    this.warrantyLink = productDetails.warrantyLink;
    this.instuctionsLink = productDetails.instuctionsLink;
  }
  extraInfoHTML () {
    return `
    <a href = "${this.instuctionsLink}" target = "_blank">Instructions</a>
    <a href = "${this.warrantyLink}" target = "_blank">Warranty</a>
    `;
  }
}

const date = new Date()
console.log(date);

console.log(this);
/* const object2 = {
  a: 2,
  b: this.a
} */

  function logThis (){
    console.log(this)
  };

  logThis();
  logThis.call('hello');



export let products = [];

export function loadProductsFetch(){
  const promise = fetch('https://supersimplebackend.dev/products').then((response) => {
    return (response.json())
  }).then((productsData) => {
    console.log(productsData)
    products = productsData.map((productDetails) => {
  if (productDetails.type === 'clothing'){
    return new Clothing (productDetails);
  } else if (productDetails.type === 'appliances'){
    return new Appliance (productDetails)
  }
  
  return new Product (productDetails);
  
});
  }).catch(() => {
    console.log('unexpected error: Please try again later')
  }); 
  return promise;
}

loadProductsFetch().then(() => {
   console.log('next step')
})
/*
 export function loadProducts (fun){
  const xhr = new XMLHttpRequest;

  xhr.addEventListener('load', () => {
      products = JSON.parse(xhr.response).map((productDetails) => {
  if (productDetails.type === 'clothing'){
    return new Clothing (productDetails);
  } else if (productDetails.type === 'appliances'){
    return new Appliance (productDetails)
  }
  
  return new Product (productDetails);
  
});
console.log('load products')
fun()
  });
  xhr.addEventListener('error', (error) => {
    console.log('unexpected error: Please try again later')
  })
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
};
*/





