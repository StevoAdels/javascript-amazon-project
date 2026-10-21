export function isWeekend (date){
   const weekDay = date.format('dddd');

   if (weekDay === 'Saturday' || weekDay === 'Sunday'){
    return weekDay
   } 
}

export function notWeekDay (today){
  
  
   const weekDay = today.getDay();
   
if (weekDay === 0 || weekDay === 6){
    return true
}

}

export function displayDate (orderItems, productItems){
    const orderTime = orderItems.orderTime
    const deliveryTime = productItems.estimatedDeliveryTime
    const difference = new Date(deliveryTime) - new Date(orderTime)
   const days = difference / (1000 * 60 * 60 * 24);

         return days
}
