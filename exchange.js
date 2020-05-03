const WebSocket = require('ws');
const Config = require('./config');

class BlockchainExchange {
    constructor() {
        this.url = 'wss://ws.prod.blockchain.info/mercury-gateway/v1/ws';
        this.origin = 'https://exchange.blockchain.com';
        this.apiSecret = Config.apiSecret;
    }

    setupWebSocket() {
      this.ws = new WebSocket(this.url, {
        origin: this.origin,
        headers: {
          'Cookie': `auth_token=${this.apiSecret}`
        }
      });

      this.ws.on('open', function open() {
        console.log("WebSocket Connected");
      });

      this.ws.on('error', function (error) {
        console.log("Websocket Error: " + error);
      });

      this.ws.on('message', message => {
         let event;
        try {
            event = JSON.parse(message);
            console.log(event);
        } catch (error) {
            event = message;
            console.log("Error getting message: " + event);
        }
      })

      this.ws.on('close', function close() {
        console.log('Disconnected');
      });
    }

    verifyWebSocketOpen() {
      try {
        if (this.ws.readyState === WebSocket.OPEN) {
            return true;
        }
        else {
             throw 'WebSocket not Open.'
        }
      } catch (error) {
          console.log(error);
      }
    }

    wsSend (message) {
      try {
          this.ws.send(JSON.stringify(message));
      } catch (error) {
        console.log("Error sending message: " + error);
      }
    } 

    wsClose() {
      try {
          this.ws.close();
      } catch (error) {
          console.log("Failed to close conenction. Error: " + error);
      }
    }

    subscribeBalances() {
      this.wsSend({
        action: 'subscribe',
        channel: 'balances'
      }) 
    }

    subscribeHeartbeat() {
      this.wsSend({
        action: 'subscribe',
        channel: 'heartbeat'
      })
    }

    subscribeL2OrderBook(symbol) {
      this.wsSend({
        action: 'subscribe',
        channel: 'l2',
        symbol: symbol
      })
    }

    subscribeL3OrderBook(symbol) {
      this.wsSend({
        action: 'subscribe',
        channel: 'l3',
        symbol: symbol
      })
    }

    subscribePrices(symbol, granularity) {
      this.wsSend({
        action: 'subscribe',
        channel: 'prices',
        symbol: symbol,
        granularity: granularity
      })
    }

    subscribeSymbols() {
      this.wsSend({
        action: 'subscribe',
        channel: 'symbols'
      })
    }

    subscribeTicker(symbol) {
      this.wsSend({
        action: 'subscribe',
        channel: 'ticker',
        symbol: symbol
      })
    }

    subscribeTrades(symbol) { // Market trades
      this.wsSend({
        action: 'subscribe',
        channel: 'trades',
        symbol: symbol
      })
    }

    subscribeTrading() { // Your Trades
      this.wsSend({
        action: 'subscribe',
        channel: 'trading'
      })
    }

    // Create Order functions
    // Must call subscribeTrading() first
    createMarketOrder(symbol, side, amount) {
      this.wsSend({
        action: 'NewOrderSingle',
        channel: 'trading',
        clOrdID: Config.orderID,
        symbol: symbol,
        ordType: 'market',
        side: side,
        orderQty: amount,
      })
    }

    // GTC = Good Til Cancelled
    // Pass 'ALO' as last paramter if you want to Add Liquidty Only.
    createLimitGTCOrder(symbol, side, amount, price, addLiquidityOnly = '') {
      this.wsSend({
        action: 'NewOrderSingle',
        channel: 'trading',
        clOrdID: Config.orderID,
        symbol: symbol,
        ordType: 'limit',
        timeInForce: 'GTC',
        side: side,
        orderQty: amount,
        price: price,
        execInst: addLiquidityOnly
      })
    }

    // GTD = Good Til Date
    // Expire Date format = YYYYMMDD
    // Pass 'ALO' as last paramter if you want to Add Liquidty Only.
    createLimitGTDOrder(symbol, side, expireDate, amount, price, addLiquidityOnly = '') {
      this.wsSend({
        action: 'NewOrderSingle',
        channel: 'trading',
        clOrdID: Config.orderID,
        symbol: symbol,
        ordType: 'limit',
        timeInForce: 'GTD',
        expireDate: expireDate,
        side: side,
        orderQty: amount,
        price: price,
        execInst: addLiquidityOnly
      })
    }

    // FOK = Fill or Kill
    // Pass 'ALO' as last paramter if you want to Add Liquidty Only.
    createLimitFOKOrder(symbol, side, amount, price, addLiquidityOnly = '') {
      this.wsSend({
        action: 'NewOrderSingle',
        channel: 'trading',
        clOrdID: Config.orderID,
        symbol: symbol,
        ordType: 'limit',
        timeInForce: 'FOK',
        side: side,
        orderQty: amount,
        price: price,
        execInst: addLiquidityOnly
      })
    }

    // FOK = Immediate Or Cancel
    // Pass 'ALO' as last paramter if you want to Add Liquidty Only.
    createLimitIOCOrder(symbol, side, amount, price, minQuantity, addLiquidityOnly = '') {
      this.wsSend({
        action: 'NewOrderSingle',
        channel: 'trading',
        clOrdID: Config.orderID,
        symbol: symbol,
        ordType: 'limit',
        timeInForce: 'IOC',
        side: side,
        orderQty: amount,
        price: price,
        minQty: minQuantity,
        execInst: addLiquidityOnly
      })
    }  

    // GTC = Good Til Cancelled
    createSellStopGTCOrder(symbol, amount, stopPx) {
      this.wsSend({
        action: 'NewOrderSingle',
        channel: 'trading',
        clOrdID: Config.orderID,
        symbol: symbol,
        ordType: 'stop',
        timeInForce: 'GTC',
        side: 'sell',
        orderQty: amount,
        stopPx: stopPx
      })
    }

    // GTD = Good Til Date
    // Expire Date format = YYYYMMDD
    createSellStopGTDOrder(symbol, expireDate, amount, stopPx) {
      this.wsSend({
        action: 'NewOrderSingle',
        channel: 'trading',
        clOrdID: Config.orderID,
        symbol: symbol,
        ordType: 'stop',
        timeInForce: 'GTD',
        expireDate: expireDate,
        side: 'sell',
        orderQty: amount,
        stopPx: stopPx
      })
    }

     // GTC = Good Til Cancelled
    createStopLimitGTCOrder(symbol, side, amount, price, stopPx) {
      this.wsSend({
        action: 'NewOrderSingle',
        channel: 'trading',
        clOrdID: Config.orderID,
        symbol: symbol,
        ordType: 'stopLimit',
        timeInForce: 'GTC',
        side: side,
        orderQty: amount,
        price: price,
        stopPx: stopPx
      })
    }

    // GTD = Good Til Date
    // Expire Date format = YYYYMMDD
    createStopLimitGTDOrder(symbol, side, expireDate, amount, price, stopPx) {
      this.wsSend({
        action: 'NewOrderSingle',
        channel: 'trading',
        clOrdID: Config.orderID,
        symbol: symbol,
        ordType: 'stopLimit',
        timeInForce: 'GTD',
        expireDate: expireDate,
        side: side,
        orderQty: amount,
        price: price,
        stopPx: stopPx
      })
    }

    cancelOrder(orderID) {
      this.wsSend({
        action: 'CancelOrderRequest',
        channel: 'trading',
        orderID: orderID
      })
    }

    cancelAllOrders() {
      this.wsSend({
        action: 'BulkCancelOrderRequest',
        channel: 'trading',
      })
    }
}

module.exports = BlockchainExchange;