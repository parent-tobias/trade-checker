// a utility function we can use to total each property as we want.
const sumBy = prop => (total, order) => order.isSellOrder ? total + order[prop] : total - order[prop];
const absoluteSum = prop => (total, order) => total + order[prop];
const toPrecision = precision => num => Math.round(num*(Math.pow(10, precision)))/Math.pow(10, precision);

export {sumBy, absoluteSum, toPrecision };