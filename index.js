let transObjects;

  //
  document.getElementById('input').addEventListener('change', (e) => {
    const file = document.getElementById('input').files[0];
    if (file) {
      processFile(file);
    }
  })

  const processFile = (file) => {
    // we define fr as a new instance of FileReader
    const fr = new FileReader();

    fr.readAsText(file);
    // Handle progress, success, and errors
    // fr.onprogress = updateProgress;
    fr.onerror = errorHandler;
    fr.onabort = () => changeStatus('Start Loading');
    fr.onloadstart =   () => changeStatus('Start Loading');
    fr.onload = () => changeStatus('Loaded')
    fr.onloadend = loadEnd;
    // Here you can perform some operations on the data asynchronously
    fr.onprogress = setProgress;
  }

  // Updates the value of the progress bar
  const setProgress = (e) => {
    // The target is the file reader
    const fr = e.target;
    const loadingPercentage =  100 * e.loaded / e.total;
    document.getElementById('progress-bar').value = loadingPercentage;
  }

  const changeStatus = (status) => {
    document.getElementById('status').innerHTML = status
  }
  const loadEnd = (e) => {
    changeStatus('Load ended!');
    const fr = e.target
    var result = fr.result;
    /***
     * So here's where the magic starts. This will run when we've
     *   read in a file completely, and then a few things happen.
     * 1. we split the file into individual lines, one per trans.
     * 2. we pull the first one off, as that's our column names (or keys)
     * 3. we iterate over all the transaction rows, and:
     *    a. split the transaction into its parts,
     *    b. create an empty object,
     *    c. use each of the keys (and the key's index) to assign the
     *       transaction values to object properties.
     *    d. finally, we return the completed object to the outer array.
     */
    const transactions = result.split(/\n/);
    const keys = transactions.shift().split(",");
    console.log(keys);
    transObjects = transactions.map(transaction=>{
      const transArr = transaction.split(",");
      const transObj = {};
      keys.forEach((key, index)=>transObj[key]=transArr[index]);
      return transObj;
    })

    /****
     * And here's where the magic ends. ;)
     */
    let completedOrders = transObjects.filter(transaction=>transaction.Status!=="REJECTED");

    const groupByInstrument = groupBy("Instrument");
    console.log(completedOrders.reduce(groupByInstrument, {}) );  }

  const errorHandler = (e) => {
    changeStatus("Error: " + e.target.error.name)
  }

const groupBy = (prop) => (obj, rec)=>{
  obj[rec[prop]] = obj[rec[prop]] || { transactions: []};
  obj[rec[prop]].transactions.push(rec);
  return obj;
}