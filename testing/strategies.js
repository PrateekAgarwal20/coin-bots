const Trade = require('./tradingFunctions.js');

/*
    IDEA: Analyze the different slopes. Based on the slope, figure out how long
    the trend lasts in that slope for a given range of slopes around it. Then,
    make a function that, given a slope, you can tell it how long to hold your money.
    It should also be able to figure out the best amount to invest because you
    don't want to invest all of it because you want some cash on hand to catch
    the next wave. Don't want to be in the situation where there is a wave and
    all your money is already in ETH
*/

const buyAndHold = (state, tempData) => {
    let newState = Object.assign({}, state);
    newState = Trade.buy(newState, tempData[0].weightedAverage);
    return newState;
};

// This is a state transition function. Input account and portfolio, output
// account' and portfolio'
// NOTE: Variables include: BUY_DIFF, STOP_LOSS_PERCENT, and RETURNS_PERCENT.
//       The last two variables are in the tradinfFunctions file
const fiveDollarBuyStrategy = (state, tempData) => {
    let newState = Object.assign({}, state);
    let prevInfo = tempData[0];
    const BUY_DIFF = 5;
    tempData.forEach((info) => {
        if(Trade.stopLoss(newState, info.weightedAverage)) {
            newState = Trade.sell(newState, info.weightedAverage);
        } else if(newState.account > 0) {
            // STRATEGY: If there is a 5$ difference within the last five minutes, buy
            if((info.weightedAverage - prevInfo.weightedAverage) > BUY_DIFF) {
                // console.log('BUY');
                // console.log('state: ', newState);
                newState = Trade.buy(newState, info.weightedAverage);
                // console.log('newState: ', newState);
            }
        } else if(newState.portfolio.ETH) {
            if(Trade.sufficientReturns(newState, info.weightedAverage)) {
                // console.log('SELL');
                // console.log('state: ', newState);
                newState = Trade.sell(newState, info.weightedAverage);
                // console.log('newState: ', newState);
            }
        }
        prevInfo = info;
    });

    return newState;
};

const candlestick = (state, tempData) => {
    let newState = Object.assign({}, state);
    tempData.forEach((info) => {
        if(Trade.stopLoss(newState, info.close)) {
            console.log('here');
            newState = Trade.sell(newState, info.close);
        } else if (newState.account > 0 && Trade.isHammerOrShadow(info) === 1) {
            newState = Trade.buy(newState, info.close);
        } else if (newState.portfolio.ETH > 0 && Trade.isHammerOrShadow(info) === -1) {
            if(Trade.sufficientReturns(newState, info.close)) {
                newState = Trade.sell(newState, info.close);
            }
        }
    });
    return newState;
};

module.exports = {
    buyAndHold,
    fiveDollarBuyStrategy,
    candlestick
};
