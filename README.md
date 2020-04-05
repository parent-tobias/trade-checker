#CSV-Parser

So this is a project that lets the user import a .csv file (assuming the first line is column names) and builds an array of JS objects from that. Using that, we can begin to manipulate those objects (for example, filtering, grouping, or reducings for stats).

To view it live, https://parent-tobias.github.io/trading-checker/

## Why v2

In the earlier version, I read in a .csv file, and I parsed it out to an array of objects. In this version, I create a CSV class, which encapsulates the functionality, allowing bidirectional csv <==> array communication, as well as file read/write.

In the earlier version, I take that array of objects and turn them to a collection of transactions, and group them into positions. Because I didn't (don't) really understand trading. But a little research indicated a fundamental change.

What I've been calling Transactions should likely be Orders, in trading terminology. An Order is simply a request to a brokerage to buy something or sell something. The difference between an Order and a Trade is, a Trade is an Order that has Completed.

Further, I was defining a Position as "You have this company you're trading, and all your trades in that company makes up your Position." And that's just wrong. A Position is a pairing of Trades, one (or more) opening a Position (in either a BUY or SELL direction) and one (or more) closing that position (by going in the opposite direction to the opening Trade). In a given day, the activity in a csv file might indicate multiple Positions, and (I need to check on this) might end with open Positions (can you end the day without closing out a position, doing longer-term trading? Are we even considering that?)

So our heirarchy changes: we have Orders within an Activity class (I think, brainstorming here). That Activity class has an api that will let us get activity on a particular Instrument (company), and that will return an Instrument class instance. That Instrument has an API of its own, letting us get Orders, Trades or Positions within that instrument.

Within each of those layers, we have a common interface:
- .gross (a numeric value)
- .fees (an array? object? Something that collects all the brokerage fees)
- .taxes (an array? object? array of objects maybe? something that collects all the applicable taxes)
- .totalExpense (total of all fees and taxes)
- .net (gross - totalExpense)

Each class will also have other interface methods, I think, though I don't know enough to know what they are at this point.

So what I've been calling Transaction class instances will change to Order, and there likely won't be a separate Trade class, as it's simply a filtered set of Orders. The Order already includes all the pricing functionality, though some of its interface functions (like averagePrice) will return zero.

I will need to create a Position class, I think, that will join Orders. The behaviour in that should be:

```js
const position = new Position(Order) // opens a Position in the given Order's direction.

position.add(Order) // adds an Order to the position, and checks if it closes. A position is closed when buy Orders and sell Orders are equal.

position.status // returns 'OPEN' or 'CLOSED' for this position.


 In this one, I'll still use that same Transactions class (it's handy), but I'll be changing the Positions class