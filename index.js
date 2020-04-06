import CSV from './classes/csv.js';
import Activity from './classes/activity.js';

window.instruments = undefined;
window.csvConverter = new CSV();

  //
  document.getElementById('input').addEventListener('change', (e) => {
    const file = document.getElementById('input').files[0];
    if (file) {
      processFile(file);
      const saveFileBtn = document.createElement("button");
      saveFileBtn.textContent="Download all";
      saveFileBtn.addEventListener("click", (e)=>{
        csvConverter.toFile(["instrument","time","type","status","averagePrice","quantity","gross","brokerage","transactionFee","GST","SEBI","stampCharge","totalFees","net"], activity.trades, "foobaz.csv");
      })
      document.querySelector("#status").appendChild(saveFileBtn);
    }
  })

async function processFile(file){
  let orders =  await csvConverter.fromFile(file)
  window.activity = new Activity(orders);
}
