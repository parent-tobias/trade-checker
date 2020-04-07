import Order from './order.js';
import {filterBy} from '../utilities/array.js';
import {sumBy, absoluteSum, currency} from "../utilities/number.js";
/**********************
 * A Position is started by passing in a Trade, and Trders 
 *   can continue to be added to a position until it reaches
 *   an equilibrium state (BUY Trades == SELL Trades). At that
 *   point, the Position is flagged as closed, and no further
 *   Orders can be added to it. (?)
 */
export default class Position {
  constructor(trade) {
    this.state = {
      trades: [trade],
    }
  }
  
  add(trade){
    if(!this.isClosed){
      this.state.trades = [...this.state.trades, trade];
    }
    return this;
  }
  get isClosed(){
    return this.quantity === 0;
  }

  // return true if this Position contains a given Trade
  contains(time){
    return this.trades.filter(filterBy("time")(time)).length > 0;
  }

  get instrument(){
    return this.trades[0].instrument;
  }

  get quantity(){
    return this.trades.reduce(sumBy("quantity"), 0);
  }
  get traded(){
    return this.trades.filter(filterBy("type")("SELL")).reduce(absoluteSum("quantity"), 0);
  }
  get opened(){
    return this.trades[0].time;
  }
  get closed(){
    return this.trades[this.trades.length-1].time;
  }
  // Returns completed orders (so non-rejected or non-cancelled)
  get trades(){
    return this.state.trades;
  }
  // This is no longer a "getter" in the sense of the others...
  trade(dateStamp){
    return this.trades.find(order => order.time == dateStamp);
  }
  get gross(){
    return currency( this.trades.reduce(sumBy("gross"), 0) );
  }
  get brokerage(){
    return currency( this.trades.reduce(absoluteSum("brokerage"), 0) );
  }
  get STT(){
    return currency( this.trades.reduce(absoluteSum("STT"), 0) );
  }
  get transactionFee(){
    return currency ( this.trades.reduce(absoluteSum("transactionFee"), 0) );
  }
  get GST(){
    return currency( this.trades.reduce(absoluteSum("GST"), 0) )
  }
  get SEBI(){
    return currency( this.trades.reduce(absoluteSum("SEBI"), 0) )
  }
  get stampCharge(){
    return currency( this.trades.reduce(absoluteSum("stampCharge"), 0) )
  }
  get totalFees(){
    return currency( this.trades.reduce(absoluteSum("totalFees"), 0) )
  }
  get net(){
    return currency( this.trades.reduce(sumBy("net"), 0) );
  }  
}