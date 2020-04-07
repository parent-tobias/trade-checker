import {currency} from '../utilities/number.js';
export default class ReportGenerator{
  constructor(csvParser){
    this.csvParser = csvParser;
  }
  allTrades(activity){
    const finalRow = {
      instrument: "TOTALS",
      gross: currency(activity.positions.reduce((total, position)=>total+position.gross, 0) ),
      totalFees: currency( activity.positions.reduce((total, position)=>total+position.totalFees, 0) ),
      net: currency( activity.positions.reduce((total, position)=>total+position.net, 0) )
    };
    const output = [...activity.trades, finalRow];
    this.csvParser.toFile(["instrument","time","type","status","averagePrice","quantity","gross","totalFees","net"], output, "trades.csv");
  }
  allPositions(activity){
    const finalRow = {
      instrument: "TOTALS",
      gross: currency( activity.positions.reduce((total, position)=>total+position.gross, 0) ),
      totalFees: currency( activity.positions.reduce((total, position)=>total+position.totalFees, 0) ),
      net: currency( activity.positions.reduce((total, position)=>total+position.net, 0 ) )
    };
    const output = [...activity.positions, finalRow];
    this.csvParser.toFile(["instrument","traded","gross","totalFees","net","opened","closed"], output, "positions.csv");
  }
  allInstruments(activity){
    const finalRow = {
      instrument: "TOTALS",
      gross: currency(activity.instruments.reduce((total, instrument)=>total+instrument.gross, 0) ),
      totalFees: currency( activity.instruments.reduce((total, instrument)=>total+instrument.totalFees, 0) ),
      net: currency( activity.instruments.reduce((total, instrument)=>total+instrument.net, 0) )
    };
    const output = [...activity.instruments, finalRow];
    this.csvParser.toFile(["instrument","traded","gross","totalFees","net"], output, "instruments.csv");
  }

}