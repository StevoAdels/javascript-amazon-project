export function isWeekend (date){
   const weekDay = date.format('dddd');

   if (weekDay === 'Saturday' || weekDay === 'Sunday'){
    return weekDay
   } 
}