export default class Transaction {
  constructor({
    "Time"        : time,
    "Type"        : type,
    "Instrument"  : instrument,
    "Product"     : product,
    "Qty."        : qty,
    "Avg. price"  : avgPrice,
    "Status"      : status
  }){
    // We'll fake it like it's react, as this is the state of our class. 
    this.state = {
      time,
      type, 
      instrument, 
      product, 
      qty, 
      avgPrice, 
      status
    }
  }
  get quantity(){
    return this.state.qty;
  }
  get averagePrice(){
    return this.state.avgPrice;
  }
  get instrument(){
    return this.state.instrument;
  }
  get gross(){
    return Number(this.quantity)*Number(this.averagePrice);
  }
  get brokerage(){
    return this.gross*.0001 > 20 ? 20 : this.gross*.0001;
  }
  get STT(){
    return (this.isSellOrder&&this.isComplete) ? this.gross*.00025 : 0;
  }
  get transactionFee(){
    // At this point, there's a question of NSE or BSE.
    const NSE = .0000325;
    const BSE = .00003;
    return this.gross*NSE;
  }
  get GST(){
    return (this.brokerage+this.transactionFee)*.18;
  }
  get SEBI(){
    return 0.000001*this.gross //  10;
  }
  get stampCharge(){
    // This is stubbed in so it doesn't crash, but we need to figure this,
    //  likely based on the user's location or something?
    return 0;
  }
  get totalFees(){
    return this.brokerage + this.STT + this.transactionFee + this.GST + this.SEBI +  this.stampCharge;
  }
  get net(){
    return this.gross - this.totalFees;
  }
  get status(){
    return this.state.status;
  }
  get type(){
    return this.state.type;
  }
  get isComplete(){
    return this.status === "COMPLETE";
  }
  get isSellOrder(){
    return this.state.type === "SELL";
  }
  get time(){
    return this.state.time;
  }
}