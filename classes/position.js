import Transaction from './transaction.js';

// a utility function we can use to total each property as we want.
const sumBy = prop => (total, transaction) => transaction.isSellOrder ? total + transaction[prop] : total - transaction[prop];
const absoluteSum = prop => (total, transaction) => total + transaction[prop];
const toPrecision = precision => num => Math.round(num*(Math.pow(10, precision))/Math.pow(10, precision));
const currency = toPrecision(2);

export default class Position {
  constructor({
    instrument,
    transactions
  }) {
    this.state = {
      instrument,
      transactions 
    }
  }
  get instrument(){
    return this.state.instrument;
  }
  get transactions(){
    return this.state.transactions;
  }
  // This is no longer a "getter" in the sense of the others...
  transaction(dateStamp){
    return this.transactions.find(transaction => transaction.time == dateStamp);
  }
  get gross(){
    return currency( this.state.transactions.reduce(sumBy("gross"), 0) );
  }
  get brokerage(){
    return currency( this.state.transactions.reduce(absoluteSum("brokerage"), 0) );
  }
  get STT(){
    return currency( this.state.transactions.reduce(absoluteSum("STT"), 0) );
  }
  get transactionFee(){
    return currency ( this.state.transactions.reduce(absoluteSum("transactionFee"), 0) );
  }
  get GST(){
    return currency( this.state.transactions.reduce(absoluteSum("GST"), 0) )
  }
  get SEBI(){
    return currency( this.state.transactions.reduce(absoluteSum("SEBI"), 0) )
  }
  get stampCharge(){
    return currency( this.state.transactions.reduce(absoluteSum("stampCharge"), 0) )
  }
  get totalFees(){
    return currency( this.state.transactions.reduce(absoluteSum("totalFees"), 0) )
  }
  get net(){
    return currency( this.state.transactions.reduce(sumBy("net"), 0) );
  }  
}