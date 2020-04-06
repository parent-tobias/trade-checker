import {currency, sumBy, absoluteSum} from "../utilities/number.js";
import {sortBy, filterBy } from "../utilities/array.js";
import Position from "./position.js";


export default class Instrument {
  constructor({
    instrument,
    orders
  }) {
    // it's a good idea for us to sort the orders here, in case.
    const sortByTime = sortBy("time");
    const isComplete = filterBy("status")("COMPLETE");

    orders = orders.sort(sortByTime);

    const positions = orders.filter(isComplete).reduce((positionTemp, trade)=>{
      let last = positionTemp.length-1;
      if(positionTemp[last] && !positionTemp[last].isClosed){
        positionTemp[last].add(trade);
      } else {
        positionTemp.push(new Position(trade) );
      }
      return positionTemp;
    },[])

    this.state = {
      instrument,
      orders,
      positions
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
  get positions(){
    return this.state.positions;
  }
  // returns a Position containing a given Trade
  position(time){
    return this.positions.filter(position => position.contains(time) );
  }
  // This is no longer a "getter" in the sense of the others...
  order(dateStamp){
    return this.orders.find(order => order.time == dateStamp);
  }
  get traded(){
    return this.positions.reduce(absoluteSum("traded"), 0);
  }
  get gross(){
    return currency( this.positions.reduce(absoluteSum("gross"), 0) );
  }
  get brokerage(){
    return currency( this.positions.reduce(absoluteSum("brokerage"), 0) );
  }
  get STT(){
    return currency( this.positions.reduce(absoluteSum("STT"), 0) );
  }
  get transactionFee(){
    return currency ( this.positions.reduce(absoluteSum("transactionFee"), 0) );
  }
  get GST(){
    return currency( this.positions.reduce(absoluteSum("GST"), 0) )
  }
  get SEBI(){
    return currency( this.positions.reduce(absoluteSum("SEBI"), 0) )
  }
  get stampCharge(){
    return currency( this.positions.reduce(absoluteSum("stampCharge"), 0) )
  }
  get totalFees(){
    return currency( this.positions.reduce(absoluteSum("totalFees"), 0) )
  }
  get net(){
    return currency( this.positions.reduce(absoluteSum("net"), 0) );
  }  
}