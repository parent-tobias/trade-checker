import Transaction from './transaction.js';

// a utility function we can use to total each property as we want.
const sumBy = prop => (total, transaction) => transaction.isSellOrder ? total + transaction[prop] : total - transaction[prop];

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
  get gross(){
    return this.state.transactions.reduce(sumBy("gross"), 0);
  }
  get brokerage(){
    return this.state.transactions.reduce(sumBy("brokerage"), 0);
  }
  get STT(){
    return this.state.transactions.reduce(sumBy("STT"), 0);
  }
  get transactionFee(){
    return this.state.transactions.reduce(sumBy("transactionFee"), 0)
  }
  get GST(){
    return this.state.transactions.reduce(sumBy("GST"), 0)
  }
  get SEBI(){
    return this.state.transactions.reduce(sumBy("brokerage"), 0)
  }
  get stampCharge(){
    return this.state.transactions.reduce(sumBy("stampCharge"), 0)
  }
  get totalFees(){
    return this.state.transactions.reduce(sumBy("totalFees"), 0)
  }
  get net(){
    return this.state.transactions.reduce(sumBy("net"), 0)
  }  
}