const Data = require('./dataFunctions.js');
const Trade = require('./tradingFunctions.js');
const Strategy = require('./strategies.js');
const ACCOUNT_START = 500;
let STOP_LOSS_PERCENT = 1;
let RETURNS_PERCENT = 1;

const main = () => {
    // // IDEA: Add the main strategy script here, what you want to test and stuff
    // // var shouldBuy = strategy(account, portfolio)
    const data = Data.data.slice(60000);
    const state = {
        account: ACCOUNT_START,
        portfolio: {ETH: 0}
    };

    // Variables for fiveDollarBuyStrategy
    // STOP_LOSS_PERCENT = 0.5;
    // RETURNS_PERCENT = 2.2;
    // Trade.setVariables(ACCOUNT_START, STOP_LOSS_PERCENT, null);

    // Variables for candlestick
    STOP_LOSS_PERCENT = 0.5;
    RETURNS_PERCENT = 25;

    Trade.setVariables(ACCOUNT_START, STOP_LOSS_PERCENT, RETURNS_PERCENT);

    // const newState = Strategy.fiveDollarBuyStrategy(state, data);
    const newState = Strategy.candlestick(state, data);
    // Convert to dollars if all assets are in ETH at end
    if(newState.portfolio.ETH) {
        newState.account = newState.account + newState.portfolio.ETH * data[data.length - 1].weightedAverage;
        newState.portfolio.ETH = 0;
    }

    console.log('ACCOUNT: ', newState.account, 'PORTFOLIO: ', newState.portfolio);
    // console.log(Trade.getOrders());

    const market = Strategy.buyAndHold(state, data);
    // Convert to dollars if all assets are in ETH at end
    if(market.portfolio.ETH) {
        market.account = market.account + market.portfolio.ETH * data[data.length - 1].weightedAverage;
        market.portfolio.ETH = 0;
    }

    console.log('BEAT THE MARKET: ', newState.account - market.account);
};

main();
