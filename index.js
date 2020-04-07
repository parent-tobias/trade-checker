import CSV from './utilities/csv.js';
import Activity from './classes/activity.js';
import ReportGenerator from './classes/report-generator.js';

window.instruments = undefined;
window.csvConverter = new CSV();

const reportGenerator = new ReportGenerator(csvConverter);

const stateEl = document.querySelector("select[name='state-choice'")
// If we have a value stored in localStorage, use it:
if(localStorage.getItem("stateChoice")){
  stateEl.querySelector(`option[value='${localStorage.getItem("stateChoice")}']`).selected=true;
}
stateEl.addEventListener("change", (e)=>{
  let select = e.target;
  localStorage.setItem("stateChoice", select.options[select.selectedIndex].value);
})
  //
  document.getElementById('input').addEventListener('change', (e) => {
    const file = document.getElementById('input').files[0];
    if (file) {
      processFile(file);

      const saveTradesBtn = document.createElement("button");
      saveTradesBtn.textContent="Download all trades";
      saveTradesBtn.addEventListener("click", (e)=>{
        reportGenerator.allTrades(activity);
      })
      document.querySelector("#status").appendChild(saveTradesBtn);

      const savePositionsBtn = document.createElement("button");
      savePositionsBtn.textContent="Download Summary by Position";
      savePositionsBtn.addEventListener("click", (e)=>{
        reportGenerator.allPositions(activity);
      })
      document.querySelector("#status").appendChild(savePositionsBtn);

      const saveByInstrument = document.createElement("button");
      saveByInstrument.textContent="Download Summary By Instrument";
      saveByInstrument.addEventListener("click", (e)=>{
        reportGenerator.allInstruments(activity);
      })
      document.querySelector("#status").appendChild(saveByInstrument);


    }
  })

async function processFile(file){
  let orders =  await csvConverter.fromFile(file)
  window.activity = new Activity(orders);
}
