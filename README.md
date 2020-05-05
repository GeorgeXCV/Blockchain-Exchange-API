# Blockchain-Exchange-API
[Blockchain.com Exchange](https://exchange.blockchain.com/) API client written in Node.js.

# Supports
- [x] Create orders of all types - Limit and Market
- [x] Get state of orders
- [x] Cancel an order
- [x] Cancel all orders
- [x] Subscribe to balances
- [x] Subscribe to market data
- [x] Subscribe to symbol reference data


# Setup
```
git clone https://github.com/GeorgeXCV/Blockchain-Exchange-API.git
npm install
Create API Key at https://exchange.blockchain.com/
Paste API Secret in config.js
npm start
```
# Usage/Example
```
const Exchange = require('./exchange');
const BlockchainExchange = new Exchange()

async gettingStarted() {
        // Always call this
        await BlockchainExchange.setupWebSocket(); 
        // Once connected, call whatever you want
        BlockchainExchange.subscribeBalances();
        // Then close the connection
        await BlockchainExchange.wsClose(); 
}
```

# Functions
### **[subscribeBalances()](https://exchange.blockchain.com/api/#balances)**
Receive balances for a user.

Response:

```javascript
{
  "seqnum": 1,
  "event": "subscribed",
  "channel": "balances"
}
```

### **[subscribeHeartbeat()](https://exchange.blockchain.com/api/#heartbeat)**
Subscribe to heartbeat server.

Response:

```javascript
{
  "seqnum": 0,
  "event": "subscribed",
  "channel": "heartbeat"
}
```

### **[subscribeL2OrderBook(symbol)](https://exchange.blockchain.com/api/#l2-order-book)**
Subscribe to l2 channel to receive Level 2 Order Book data. This channel returns the volume available at each price. All the price levels are retrieved with this channel. Subscribing is done per symbol. Each entry in bids and asks arrays is a price level, along with its price (px), quantity (qty) and number of orders (num) attributes.

Response:

```javascript
{
  "seqnum": 1,
  "event": "subscribed",
  "channel": "l2",
  "symbol": "BTC-USD"
}

{
  "seqnum": 2,
  "event": "snapshot",
  "channel": "l2",
  "symbol": "BTC-USD",
  "bids": [
    {
      "px": 8723.45,
      "qty": 1.45,
      "num": 2
    },
    {
      "px": 8124.45,
      "qty": 123.45,
      "num": 1
    }
  ],
  "asks": [
    {
      "px": 8730.0,
      "qty": 1.55,
      "num": 2
    },
    {
      "px": 8904.45,
      "qty": 13.66,
      "num": 2
    }
  ]
}
```

### **[subscribeL3OrderBook(symbol)](https://exchange.blockchain.com/api/#l3-order-book)**
Subscribe to l3 channel to receive Level 3 Order Book data.  This channel returns all the order updates reaching the exchange; by applying the updates to the snapshot you can recreate the full state of the orderbook. Subscribing is done per symbol. Each entry in bids and asks arrays is an order, along with its id (id), price (px) and quantity (qty) attributes.

Response:

```javascript
{
  "seqnum": 1,
  "event": "subscribed",
  "channel": "l3",
  "symbol": "BTC-USD"
}

{
  "seqnum": 2,
  "event": "snapshot",
  "channel": "l3",
  "symbol": "BTC-USD",
  "bids": [
    {
      "id": "1234",
      "px": 8723.45,
      "qty": 1.1
    },
    {
      "id": "1235",
      "px": 8723.45,
      "qty": 0.35
    },
    {
      "id": "234",
      "px": 8124.45,
      "qty": 123.45
    }
  ],
  "asks": [
    {
      "id": "2222",
      "px": 8730.0,
      "qty": 0.65
    },
    {
      "id": "2225",
      "px": 8730.0,
      "qty": 0.9
    },
    {
      "id": "2343",
      "px": 8904.45,
      "qty": 8.66
    },
    {
      "id": "2353",
      "px": 8904.45,
      "qty": 5.0
    }
  ]
}
```

### **[subscribePrices(symbol, granularity)](https://exchange.blockchain.com/api/#prices)**
Subscribe to the prices channel to receive candlestick market data. Subscriptions are per symbol and granularity (in seconds) has to be specified. Supported granularity values are: 60, 300, 900, 3600, 21600, 86400

Response:

```javascript
{
  "seqnum": 0,
  "event": "subscribed",
  "channel": "prices",
  "symbol": "BTC-USD"
}

{
  "seqnum": 2,
  "event": "updated",
  "channel": "prices",
  "symbol": "BTC-USD",
  "price": [1559039640, 8697.24, 8700.98, 8697.27, 8700.98, 0.431]
}
```

### **[subscribeSymbols()](https://exchange.blockchain.com/api/#symbols)**
Subscribe to the symbols channel to receive symbol updates.

Response:

```javascript
{
  "seqnum": 0,
  "event": "subscribed",
  "channel": "symbols"
}

{
  "seqnum": 1,
  "event": "snapshot",
  "channel": "symbols",
  "symbols": {
    "BTC-USD": {
      "base_currency": "BTC",
      "base_currency_scale": 8,
      "counter_currency": "USD",
      "counter_currency_scale": 2,
      "min_price_increment": 10,
      "min_price_increment_scale": 0,
      "min_order_size": 50,
      "min_order_size_scale": 2,
      "max_order_size": 0,
      "max_order_size_scale": 8,
      "lot_size": 5,
      "lot_size_scale": 2,
      "status": "halt",
      "id": 1,
      "auction_price": 0.0,
      "auction_size": 0.0,
      "auction_time": "",
      "imbalance": 0.0
    },
    "ETH-BTC": {
      "base_currency": "ETH",
      "base_currency_scale": 8,
      "counter_currency": "BTC",
      "counter_currency_scale": 8,
      "min_price_increment": 100,
      "min_price_increment_scale": 8,
      "min_order_size": 220001,
      "min_order_size_scale": 8,
      "max_order_size": 0,
      "max_order_size_scale": 8,
      "lot_size": 0,
      "lot_size_scale": 0,
      "status": "open",
      "id": 3,
      "auction_price": 0.0,
      "auction_size": 0.0,
      "auction_time": "",
      "imbalance": 0.0
    },
    "BTC-EUR": {
      "base_currency": "BTC",
      "base_currency_scale": 8,
      "counter_currency": "EUR",
      "counter_currency_scale": 2,
      "min_price_increment": 10,
      "min_price_increment_scale": 0,
      "min_order_size": 50,
      "min_order_size_scale": 2,
      "max_order_size": 0,
      "max_order_size_scale": 0,
      "lot_size": 0,
      "lot_size_scale": 0,
      "status": "closed",
      "id": 4,
      "auction_price": 0.0,
      "auction_size": 0.0,
      "auction_time": "",
      "imbalance": 0.0
    },
    "ETH-EUR": {
      "base_currency": "ETH",
      "base_currency_scale": 8,
      "counter_currency": "EUR",
      "counter_currency_scale": 2,
      "min_price_increment": 10,
      "min_price_increment_scale": 0,
      "min_order_size": 50,
      "min_order_size_scale": 2,
      "max_order_size": 500,
      "max_order_size_scale": 2,
      "lot_size": 0,
      "lot_size_scale": 0,
      "status": "open",
      "id": 5,
      "auction_price": 0.0,
      "auction_size": 0.0,
      "auction_time": "",
      "imbalance": 0.0
    },
    "ETH-USD": {
      "base_currency": "ETH",
      "base_currency_scale": 8,
      "counter_currency": "USD",
      "counter_currency_scale": 2,
      "min_price_increment": 5,
      "min_price_increment_scale": 0,
      "min_order_size": 50,
      "min_order_size_scale": 2,
      "max_order_size": 0,
      "max_order_size_scale": 0,
      "lot_size": 0,
      "lot_size_scale": 0,
      "status": "open",
      "id": 2,
      "auction_price": 0.0,
      "auction_size": 0.0,
      "auction_time": "",
      "imbalance": 0.0
    }
  }
}
```

### **[subscribeTicker(symbol)](https://exchange.blockchain.com/api/#ticker)**
Subscribe to ticket channel In order to receive ticker update. Subscriptions are again per symbol.

Response:

```javascript
{
  "seqnum": 0,
  "event": "subscribed",
  "channel": "ticker"
}

{
  "seqnum": 8,
  "event": "snapshot",
  "channel": "ticker",
  "symbol": "BTC-USD",
  "price_24h": 4988.0,
  "volume_24h": 0.3015,
  "last_trade_price": 5000.0
}
```

### **[subscribeTrades(symbol)](https://exchange.blockchain.com/api/#trades)**
Subscribe to trades channel in order to receive trade updates on executions within each market across the Exchange.

Response:

```javascript
{
  "seqnum": 0,
  "event": "subscribed",
  "channel": "trades",
  "symbol": "ETH-USD"
}

{
  "seqnum": 21,
  "event": "updated",
  "channel": "trades",
  "symbol": "ETH-USD",
  "timestamp": "2019-08-13T11:30:06.100140Z",
  "side": "sell",
  "qty": 8.5E-5,
  "price": 11252.4,
  "trade_id": "12884909920"
}
```

### **[subscribeTrading()](https://exchange.blockchain.com/api/#trading)**
Subscribe to the trading channel, required to create trades. Will show current live orders for user.

Response:

```javascript
{
  "seqnum": 1,
  "event": "subscribed",
  "channel": "trading"
}

{
  "seqnum": 3,
  "event": "snapshot",
  "channel": "trading",
  "orders": [
    {
      "orderID": "12891851020",
      "clOrdID": "78502a08-c8f1-4eff-b",
      "symbol": "BTC-USD",
      "side": "sell",
      "ordType": "limit",
      "orderQty": 5.0e-4,
      "leavesQty": 5.0e-4,
      "cumQty": 0.0,
      "avgPx": 0.0,
      "ordStatus": "open",
      "timeInForce": "GTC",
      "text": "New order",
      "execType": "0",
      "execID": "11321871",
      "transactTime": "2019-08-13T11:30:03.000593290Z",
      "msgType": 8,
      "lastPx": 0.0,
      "lastShares": 0.0,
      "tradeId": "0",
      "price": 15000.0
    }
  ]
}
```
### **[createMarketOrder(symbol, side, amount)](https://exchange.blockchain.com/api/#create-a-new-order-newordersingle)**
Creates a Market Order for your chosen symbol. Also required to pass in side ('buy' or 'sell'), along with the amount.

Response:

```javascript
{
  "seqnum": 5,
  "event": "updated",
  "channel": "trading",
  "orderID": "12891915594",
  "clOrdID": "b50112a2-9851-43ce-a",
  "symbol": "BTC-USD",
  "side": "sell",
  "ordType": "market",
  "orderQty": 0.001,
  "leavesQty": 0.0,
  "cumQty": 0.001,
  "avgPx": 11142.7,
  "ordStatus": "filled",
  "timeInForce": "GTC",
  "text": "Fill",
  "execType": "F",
  "execID": "11451022",
  "transactTime": "2019-08-13T13:50:02.000027480Z",
  "msgType": 8,
  "lastPx": 11142.7,
  "lastShares": 0.001,
  "tradeId": "12884910084"
}
```

### **[createLimitGTCOrder(symbol, side, amount, price, addLiquidityOnly = '')](https://exchange.blockchain.com/api/#create-a-new-order-newordersingle)**
Creates a Limit Good Til Cancelled Order for your chosen symbol. Also required to pass in side ('buy' or 'sell'), amount and price. addLiquidityOnly can be enabled by passing in 'ALO'.

Response:

```javascript
{
  "seqnum": 3,
  "event": "snapshot",
  "channel": "trading",
  "orders": [
    {
      "orderID": "12891851020",
      "clOrdID": "78502a08-c8f1-4eff-b",
      "symbol": "BTC-USD",
      "side": "sell",
      "ordType": "limit",
      "orderQty": 5.0e-4,
      "leavesQty": 5.0e-4,
      "cumQty": 0.0,
      "avgPx": 0.0,
      "ordStatus": "open",
      "timeInForce": "GTC",
      "text": "New order",
      "execType": "0",
      "execID": "11321871",
      "transactTime": "2019-08-13T11:30:03.000593290Z",
      "msgType": 8,
      "lastPx": 0.0,
      "lastShares": 0.0,
      "tradeId": "0",
      "price": 15000.0
    }
  ]
}
```

### **[createLimitGTDOrder(symbol, side, expireDate, amount, price, addLiquidityOnly = '')](https://exchange.blockchain.com/api/#create-a-new-order-newordersingle)**
Creates a Limit Good Til Date Order for your chosen symbol. Also required to pass in side ('buy' or 'sell'), expire date (YYYYMMDD), amount and price. addLiquidityOnly can be enabled by passing in 'ALO'.

Response:

```javascript
{
  "seqnum": 3,
  "event": "snapshot",
  "channel": "trading",
  "orders": [
    {
      "orderID": "12891851020",
      "clOrdID": "78502a08-c8f1-4eff-b",
      "symbol": "BTC-USD",
      "side": "sell",
      "ordType": "limit",
      "orderQty": 5.0e-4,
      "leavesQty": 5.0e-4,
      "cumQty": 0.0,
      "avgPx": 0.0,
      "ordStatus": "open",
      "timeInForce": "GTD",
      "expireDate": "20200504",
      "text": "New order",
      "execType": "0",
      "execID": "11321871",
      "transactTime": "2019-08-13T11:30:03.000593290Z",
      "msgType": 8,
      "lastPx": 0.0,
      "lastShares": 0.0,
      "tradeId": "0",
      "price": 15000.0
    }
  ]
}
```

### **[createLimitFOKOrder(symbol, side, amount, price, addLiquidityOnly = '')](https://exchange.blockchain.com/api/#create-a-new-order-newordersingle)**
Creates a Limit Fill or Kill Order for your chosen symbol. Also required to pass in side ('buy' or 'sell'), amount and price. addLiquidityOnly can be enabled by passing in 'ALO'.

Response:

```javascript
{
  "seqnum": 5,
  "event": "updated",
  "channel": "trading",
  "orderID": "12891915594",
  "clOrdID": "b50112a2-9851-43ce-a",
  "symbol": "BTC-USD",
  "side": "sell",
  "price": 5000,
  "ordType": "limit",
  "orderQty": 0.001,
  "leavesQty": 0.0,
  "cumQty": 0.001,
  "avgPx": 11142.7,
  "ordStatus": "filled",
  "timeInForce": "FOK",
  "text": "Fill",
  "execType": "F",
  "execID": "11451022",
  "transactTime": "2019-08-13T13:50:02.000027480Z",
  "msgType": 8,
  "lastPx": 11142.7,
  "lastShares": 0.001,
  "tradeId": "12884910084"
}
```

### **[createLimitIOCOrder(symbol, side, amount, price, minQuantity, addLiquidityOnly = '')](https://exchange.blockchain.com/api/#create-a-new-order-newordersingle)**
Creates a Limit Immediate Or Kill Order for your chosen symbol. Also required to pass in side ('buy' or 'sell'), amount, price and minimum quanitiy. addLiquidityOnly can be enabled by passing in 'ALO'.

Response:

```javascript
{
  "seqnum": 3,
  "event": "updated",
  "channel": "trading",
  "msgType": "8",
  "clOrdID": "Client ID 3",
  "orderID": "999999878",
  "ordStatus": "open",
  "execType": "0",
  "symbol": "BTC-USD",
  "side": "sell",
  "minQty": 1.0,   
  "orderQty": 10.0,
  "ordType": "limit",
  "timeInForce": "IOC",
  "price": 3400.0,
  "transactTime": "2019-08-13T13:09:34.000659345Z",
  "leavesQty": 10.0,
  "cumQty": 0.0,
  "avgPx": 0.0
}
```


### **[createSellStopGTCOrder(symbol, amount, stopPx)](https://exchange.blockchain.com/api/#create-a-new-order-newordersingle)**
Creates a Sell Stop Good Til Cancelled Order for your chosen symbol. Also required to pass amount and trigger price (stopPx). 

Response:

```javascript
{
  "seqnum": 5,
  "event": "updated",
  "channel": "trading",
  "orderID": "12891915594",
  "clOrdID": "b50112a2-9851-43ce-a",
  "symbol": "BTC-USD",
  "side": "sell",
  "stopPX": 5000,
  "ordType": "stop",
  "orderQty": 0.001,
  "leavesQty": 0.0,
  "cumQty": 0.001,
  "avgPx": 11142.7,
  "ordStatus": "filled",
  "timeInForce": "FOK",
  "text": "Fill",
  "execType": "F",
  "execID": "11451022",
  "transactTime": "2019-08-13T13:50:02.000027480Z",
  "msgType": 8,
  "lastPx": 11142.7,
  "lastShares": 0.001,
  "tradeId": "12884910084"
}
```

### **[createSellStopLimitGTCOrder(symbol, side, amount, price, stopPx)](https://exchange.blockchain.com/api/#create-a-new-order-newordersingle)**
Creates a Sell Stop Limit Good Til Cancelled Order for your chosen symbol. Also required to pass in side ('buy' or 'sell'), amount, price and trigger price (stopPx).

Response:

```javascript
{
  "seqnum": 5,
  "event": "updated",
  "channel": "trading",
  "orderID": "12891915594",
  "clOrdID": "b50112a2-9851-43ce-a",
  "symbol": "BTC-USD",
  "side": "sell",
  "price": 6000,
  "stopPX": 5000,
  "ordType": "stop-limit",
  "orderQty": 0.001,
  "leavesQty": 0.0,
  "cumQty": 0.001,
  "avgPx": 11142.7,
  "ordStatus": "filled",
  "timeInForce": "GTC",
  "text": "Fill",
  "execType": "F",
  "execID": "11451022",
  "transactTime": "2019-08-13T13:50:02.000027480Z",
  "msgType": 8,
  "lastPx": 11142.7,
  "lastShares": 0.001,
  "tradeId": "12884910084"
}
```

### **[createSellStopGTDOrder(symbol, expireDate, amount, stopPx)](https://exchange.blockchain.com/api/#create-a-new-order-newordersingle)**
Creates a Sell Stop Good Til Date Order for your chosen symbol. Also required to pass in side ('buy' or 'sell'), expire date (YYYYMMDD),  amount and trigger price (stopPx).

Response:

```javascript
{
  "seqnum": 5,
  "event": "updated",
  "channel": "trading",
  "orderID": "12891915594",
  "clOrdID": "b50112a2-9851-43ce-a",
  "symbol": "BTC-USD",
  "side": "sell",
  "stopPX": 5000,
  "expireDate:": "20200304",
  "ordType": "stop",
  "orderQty": 0.001,
  "leavesQty": 0.0,
  "cumQty": 0.001,
  "avgPx": 11142.7,
  "ordStatus": "filled",
  "timeInForce": "GTD",
  "text": "Fill",
  "execType": "F",
  "execID": "11451022",
  "transactTime": "2019-08-13T13:50:02.000027480Z",
  "msgType": 8,
  "lastPx": 11142.7,
  "lastShares": 0.001,
  "tradeId": "12884910084"
}
```


### **[createStopLimitGTDOrder(symbol, side, expireDate, amount, price, stopPx)](https://exchange.blockchain.com/api/#create-a-new-order-newordersingle)**
Creates a Sell Stop  Limit Good Til Date Order for your chosen symbol. Also required to pass in side ('buy' or 'sell'), expire date (YYYYMMDD), amount, price and trigger price (stopPx).

Response:

```javascript
{
  "seqnum": 5,
  "event": "updated",
  "channel": "trading",
  "orderID": "12891915594",
  "clOrdID": "b50112a2-9851-43ce-a",
  "symbol": "BTC-USD",
  "side": "sell",
  "stopPX": 5000,
  "price": 6000,
  "expireDate:": "20200304",
  "ordType": "stop",
  "orderQty": 0.001,
  "leavesQty": 0.0,
  "cumQty": 0.001,
  "avgPx": 11142.7,
  "ordStatus": "filled",
  "timeInForce": "GTD",
  "text": "Fill",
  "execType": "F",
  "execID": "11451022",
  "transactTime": "2019-08-13T13:50:02.000027480Z",
  "msgType": 8,
  "lastPx": 11142.7,
  "lastShares": 0.001,
  "tradeId": "12884910084"
}
```


### **[cancelOrder(orderID)](https://exchange.blockchain.com/api/#cancel-an-order-cancelorderrequest)**
Cancel order for user using given ID.

Response:

```javascript
{
  "seqnum": 18,
  "event": "updated",
  "channel": "trading",
  "orderID": "999999878",
  "clOrdID": "Client ID 3",
  "symbol": "BTC-USD",
  "side": "sell",
  "ordType": "limit",
  "orderQty": 10.0,
  "leavesQty": 10.0,
  "cumQty": 0.0,
  "avgPx": 0.0,
  "ordStatus": "cancelled",
  "timeInForce": "GTC",
  "text": "Canceled by User",
  "execType": "4",
  "execID": "11397697",
  "transactTime": "2019-08-13T13:15:35.000955868Z",
  "msgType": 8,
  "lastPx": 0.0,
  "lastShares": 0.0,
  "tradeId": "0",
  "price": 3400.0
}
```

### **[cancelAllOrders()](https://exchange.blockchain.com/api/#cancel-an-order-cancelorderrequest)**
Cancel all orders for user.

Response:

```javascript
{
  "seqnum": 18,
  "event": "updated",
  "channel": "trading",
  "orderID": "999999878",
  "clOrdID": "Client ID 3",
  "symbol": "BTC-USD",
  "side": "sell",
  "ordType": "limit",
  "orderQty": 10.0,
  "leavesQty": 10.0,
  "cumQty": 0.0,
  "avgPx": 0.0,
  "ordStatus": "cancelled",
  "timeInForce": "GTC",
  "text": "Canceled by User",
  "execType": "4",
  "execID": "11397697",
  "transactTime": "2019-08-13T13:15:35.000955868Z",
  "msgType": 8,
  "lastPx": 0.0,
  "lastShares": 0.0,
  "tradeId": "0",
  "price": 3400.0
}
```
