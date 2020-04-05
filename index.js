import Transaction from './classes/transaction.js';
import Position from './classes/position.js';
import CSV from './classes/csv.js';

window.transObjects = undefined;
window.csvConverter = new CSV();

  //
  document.getElementById('input').addEventListener('change', (e) => {
    const file = document.getElementById('input').files[0];
    if (file) {
      processFile(file);
      const saveFileBtn = document.createElement("button");
      saveFileBtn.textContent="Download all";
      saveFileBtn.addEventListener("click", (e)=>{
        csvConverter.toFile(["instrument","time","type","status","averagePrice","quantity","gross","brokerage","transactionFee","GST","SEBI","stampCharge","totalFees","net"], transObjects, "foobaz.csv");
      })
      document.querySelector("#status").appendChild(saveFileBtn);
    }
  })

async function processFile(file){
    
    window.transObjects = await csvConverter.fromFile(file)
    transObjects = transObjects.map(transaction=>{
      return new Transaction(transaction);
    })

    /****
     * And here's where the magic ends. ;)
     */
    let completedOrders = transObjects.filter(transaction=>!transaction.isComplete);

    const isComplete = transaction => transaction.isComplete;
    const groupByInstrument = groupBy("instrument");
    
    const completedObject = transObjects.filter(isComplete).reduce(groupByInstrument, {});
    console.log(Object.keys(completedObject) );
    window.positions = Object.keys(completedObject).map( instrument =>{
      console.log(instrument, completedObject[instrument])
      return new Position({
      instrument, 
      transactions: completedObject[instrument].transactions
    })
  })
  }

  const errorHandler = (e) => {
    changeStatus("Error: " + e.target.error.name)
  }

const groupBy = (prop) => (obj, rec)=>{
  obj[rec[prop]] = obj[rec[prop]] || { transactions: []};
  obj[rec[prop]].transactions.push(rec);
  return obj;
}