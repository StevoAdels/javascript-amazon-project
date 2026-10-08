class Car {
    #model;
    #brand;
    speed = 0;
    isTrunkOpen = true;

    constructor(carDetails){
        this.#model = carDetails.model;
        this.#brand = carDetails.brand
    }
  

    openTrunk () {
        if (this.speed === 0){
            this.isTrunkOpen = true;
        } else {
            this.isTrunkOpen = false;
        }
    } 
    closeTrunk () {
       
            this.isTrunkOpen = false
        
    }
      break (){
        if (this.speed >= 0 && this.speed <= 200){
        this.speed += -5
        }
    }
    go (){
         if (this.isTrunkOpen === false){
        if (this.speed >= 0 && this.speed <= 200){
        this.speed += 5
            }
        }
    }
    
    displayInfo (){
        console.log(`${this.#brand} ${this.#model} Speed: ${this.speed} km/h Trunk Open: ${this.isTrunkOpen}`)
    }
}

const car1 = new Car ({
    brand: 'Toyota',
    model: 'Corolla'
});

const car2 = new Car ({
    brand: 'Tesla',
    model: 'Model 3'
})
car1.closeTrunk()
car1.go()
car1.openTrunk()
car1.displayInfo();

class RaceCar extends Car{
    brand;
    model;
    acceleration = 10;
    constructor (carDetails){
        super(carDetails)
        this.acceleration = carDetails.acceleration
        this.brand = carDetails.brand
        this.model = carDetails.model       
    }
    go(){
        if(this.speed >=0 && this.speed <= 300){
            this.speed += this.acceleration
        }
    }
     break(){
        if(this.speed >=0 && this.speed <= 300){
            this.speed += -acceleration
        }
    }
    openTrunk (){
        ``
    }
    closeTrunk(){

    }
    displayInfo (){
        console.log(`${this.brand} ${this.model} Speed: ${this.speed} km/h `)
    }
}


const car = new RaceCar ({
    brand: 'Tesla',
    model: 'Model 3',
    acceleration: 20
})

car.go()
car.displayInfo();