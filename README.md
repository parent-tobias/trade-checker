# CSV-Parser

So this is a project that lets the user import a .csv file (assuming the first line is column names) and builds an array of JS objects from that. Using that, we can begin to manipulate those objects (for example, filtering, grouping, or reducings for stats).

To view it live, https://parent-tobias.github.io/trade-checker/

## Why v2

In the earlier version, I read in a .csv file, and I parsed it out to an array of objects. In this version, I create a CSV class, which encapsulates the functionality, allowing bidirectional csv <==> array communication, as well as file read/write.

In the earlier version, I take that array of objects and turn them to a collection of transactions, and group them into positions. Because I didn't (don't) really understand trading. But a little research indicated a fundamental change.

## Changes have been made

So when the CSV is parsed, an array of generic objects is made. We take that array, and pass it into an instance of the Activity class. All a file's trades constitute Activity.

When a new Activity object is created (by passing in an array of orders), the array of generic objects is changed to an array of Order objects. These are used to create an array of Instruments (companies or traded entities), which are then fed all the Orders for that Instrument.

Each Instrument maintains its own collection of Orders, and can be queried for all the Orders, or all the Trades (completed Orders, not rejected or cancelled). Further, each instrument maintains an array of Positions.

A Position is a matched set of Trades. A Position is opened by passing in a Trade, which establishes the direction of that Position. And as long as the `.quantity` on that Position has not reached zero, Trades can be added to it. So it might be that an opening Trade of 75 units to buy opens a Position, which can then add another 25 to buy, and another 50 to buy, followed by 150 to sell which closes the Position. The next Trade opens a new Position, and so on.

## So, an API

Yes, we have an API of sorts. Basically, we have a LOT of nested objects, and arrays of objects. But when the Activity object is created, it includes all sorts of information:

```
// orders would be an array of generic order objects, 
//    built by the csv. Format of that csv will follow.
const myActivity = new Activity(orders);
 
// an array of Order objects, sorted by time stamp.
myActivity.orders

// Same as above, but solely COMPLETED orders.
myActivity.trades

// an array of Instrument objects
myActivity.instruments 

// retrieve one specific Instrument, by its name as a string
myActivity.instrument(String)

// Get all the Position objects, regardless of Instrument
myActivity.positions

// Further, there is an API for the Instrument object:
const myInstrument = myActivity.instrument("ITC");

// Get the name of the current Instrument
myInstrument.instrument

// The same as .orders and .trades above, solely for this Instrument
myInstrument.orders
myInstrument.trades

// Same as .positions above, solely for this Instrument
myInstrument.positions

// Retrieve one Position, that contains a given Trade. 
//  Trades are found by their date stamp
// .order retrieves that one Order object.
myInstrument.position(DateStamp)
myInstrument.order(DateStamp)

// Retrieve a count of traded shares in this Position. In the 
//   above example, though 300 units were moved, there were 150
//   traded shares - bought once and sold once.
myInstrument.traded

// The following are common to Instrument, Position and Order
//   classes. The first three provide a summary detail...
myInstrument.gross
myInstrument.totalFees
myInstrument.net

// ... And the rest provide a breakdown of fees and taxes.
myInstrument.brokerage
myInstrument.transactionFee
myInstrument.SEBI
myInstrument.STT
myInstrument.GST
myInstrument.stampCharge

// In addition to those common functions, Position objects have a couple unique properties.
const myPosition = myInstrument.positions[0] // It's just an array

// Add a Trade to a position. Note, if you try to add a Trade to
//  a closed Position, *it won't warn you*. It just ignores it.
myPosition.add(Order)

// Find a specific Trade in the Position, by its Timestamp
myPosition.trade(DateTime)

// True or false, depending if the Position has outstanding traded shares
myPosition.isClosed

// Stats about the Position
myPosition.instrument // Name of Instrument containing this
myPosition.traded     // Number of traded shares
myPosition.opened     // Timestamp of the opening order
myPosition.closed     // Timestamp of the closing order

// And on the Order object, there are a couple unique properties
const myTrade = myPosition.trade("04-04-2020 10:35:00.000");

// In addition to the common properties above, we also have
myTrade.quantity
myTrade.averagePrice

```
