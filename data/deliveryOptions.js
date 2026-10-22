import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {isWeekend} from '../scripts/checkout/weekend.js';
import {notWeekDay} from '../scripts/checkout/weekend.js';

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    }, {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    }, {
        id: '3',
        deliveryDays: 1,
        priceCents: 999  
    }
]


export function getDeliveryOption (deliveryOptionId){
let matchingId;


 deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.id === deliveryOptionId){
      matchingId = deliveryOption;
    }
 });

 return matchingId || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){
     
        const today = dayjs();

        let dayCount = deliveryOption.deliveryDays
            let i = 0;

        while (dayCount > 0){
            i++
            const deliveryDate = today.add(i,
                'days'
            );

            const day = isWeekend(deliveryDate)
            if (day){
                
                dayCount += 0
            }

        else if (!day) { 
            
            dayCount += -1
        }

        }


            const deliveryDate = today.add(i,
                'days'
            );


            
            const dateString = deliveryDate.format('dddd, MMMM D')

            return dateString;
}

export function calculateDeliveryTime (days, orderItems){
   const  today = new Date(orderItems.orderTime)
    

        
        let dayCount = days
           
   
        while (dayCount > 0){
           today.setDate(today.getDate() + 1)
            const day = notWeekDay(today)
           if (!day) { 
                dayCount += -1
         }

        }
        
      
    
    
    return today
}


