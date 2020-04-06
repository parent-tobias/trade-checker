// a utility function we can use to total each property as we want.

// Some number utilities to start
const sumBy = prop => (total, order) => order.isSellOrder 
   ? Number(total) + Number(order[prop]) 
   : Number(total) - Number(order[prop]);
const absoluteSum = prop => (total, obj) => Number(total) + Number(obj[prop]);
const toPrecision = precision => num => Math.round(num*(Math.pow(10, precision)))/Math.pow(10, precision);
const currency = toPrecision(2);

export {sumBy, absoluteSum, toPrecision, currency };