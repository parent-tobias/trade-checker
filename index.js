import CSV from './classes/csv.js';
import Activity from './classes/activity.js';

window.instruments = undefined;
window.csvConverter = new CSV();

  //
  document.getElementById('input').addEventListener('change', (e) => {
    const file = document.getElementById('input').files[0];
    if (file) {
      processFile(file);

      const saveTradesBtn = document.createElement("button");
      saveTradesBtn.textContent="Download all trades";
      saveTradesBtn.addEventListener("click", (e)=>{
        csvConverter.toFile(["instrument","time","type","status","averagePrice","quantity","gross","totalFees","net"], activity.trades, "trades.csv");
      })
      document.querySelector("#status").appendChild(saveTradesBtn);

      const savePositionsBtn = document.createElement("button");
      savePositionsBtn.textContent="Download Summary by Position";
      savePositionsBtn.addEventListener("click", (e)=>{
        csvConverter.toFile(["instrument","traded","gross","totalFees","net","opened","closed"], activity.positions, "positions.csv");
      })
      document.querySelector("#status").appendChild(savePositionsBtn);

      const saveByInstrument = document.createElement("button");
      saveByInstrument.textContent="Download Summary By Instrument";
      saveByInstrument.addEventListener("click", (e)=>{
        csvConverter.toFile(["instrument","traded","gross","totalFees","net"], activity.instruments, "instruments.csv");
      })
      document.querySelector("#status").appendChild(saveByInstrument);


    }
  })

async function processFile(file){
  let orders =  await csvConverter.fromFile(file)
  window.activity = new Activity(orders);
}
