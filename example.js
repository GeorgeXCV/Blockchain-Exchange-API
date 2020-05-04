const Exchange = require('./exchange');

const BlockchainExchange = new Exchange()

async function playground() {
    try {
        await BlockchainExchange.setupWebSocket();
        BlockchainExchange.subscribeSymbols();
        BlockchainExchange.subscribeBalances();
        BlockchainExchange.subscribeTrading();
        // Place actual trades:
        // BlockchainExchange.createMarketOrder("BTC-USD", "sell", 1);
        // BlockchainExchange.createLimitGTCOrder("ETH-USD", "buy", 1, 100);
        await BlockchainExchange.wsClose();
    } catch (error) {
        console.log("Error running playground. Error: " + error)
    }
}

playground();