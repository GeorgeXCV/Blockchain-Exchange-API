const Config = require('../utils/config');
const Exchange = require('../exchange');

const BlockchainExchange = new Exchange()

async function wait (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function playground() {
    try {
        BlockchainExchange.setupWebSocket();
        await wait(5000); // Wait for WebSocket to connect
        if (BlockchainExchange.verifyWebSocketOpen()) {
            // You are connected to WebSocket, call whatever you want
            BlockchainExchange.subscribeBalances();
            BlockchainExchange.subscribeSymbols();
            BlockchainExchange.subscribeTrading();
            // Place actual trades:
            // BlockchainExchange.createMarketOrder("BTC-USD", "sell", 1);
            // BlockchainExchange.createLimitGTCOrder("ETH-USD", "buy", 1, 100);
        }
        await wait(5000); // Wait before closing connection
        BlockchainExchange.wsClose();
    } catch (error) {
        console.log("Error running playground. Error: " + error)
    }
}

playground();