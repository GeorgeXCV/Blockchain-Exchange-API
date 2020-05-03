// Create key at https://exchange.blockchain.com/ 
// Paste API secret below
module.exports.apiSecret = "YOUR_API_SECRET";
// ID used when placing trades. Customize to your liking
module.exports.orderID = "API : #" + (Math.floor(Math.random() * 10000) + 1).toString(); 