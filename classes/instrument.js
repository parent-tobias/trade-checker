

import Order from './order.js';
import "./utility.js";

const currency = toPrecision(2);

export default class Instrument {
  constructor({
    instrument,
    orders
  }) {
    this.state = {
      instrument,
      orders 
    }
  }
  get instrument(){
    return this.state.instrument;
  }
  get orders(){
    return this.state.orders;
  }
  get trades(){
    return this.state.orders.filter(order => order.status==="COMPLETE");
  }
  // This is no longer a "getter" in the sense of the others...
  order(dateStamp){
    return this.orders.find(order => order.time == dateStamp);
  }
  get gross(){
    return currency( this.orders.reduce(sumBy("gross"), 0) );
  }
  get brokerage(){
    return currency( this.orders.reduce(absoluteSum("brokerage"), 0) );
  }
  get STT(){
    return currency( this.orders.reduce(absoluteSum("STT"), 0) );
  }
  get transactionFee(){
    return currency ( this.orders.reduce(absoluteSum("transactionFee"), 0) );
  }
  get GST(){
    return currency( this.orders.reduce(absoluteSum("GST"), 0) )
  }
  get SEBI(){
    return currency( this.orders.reduce(absoluteSum("SEBI"), 0) )
  }
  get stampCharge(){
    return currency( this.orders.reduce(absoluteSum("stampCharge"), 0) )
  }
  get totalFees(){
    return currency( this.orders.reduce(absoluteSum("totalFees"), 0) )
  }
  get net(){
    return currency( this.orders.reduce(sumBy("net"), 0) );
  }  
}