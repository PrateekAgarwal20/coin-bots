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

// This is a state transition function. Input account and portfolio, output
// account' and portfolio'
// TODO: run tests with intervals other than 5 dollars but not so low that the fee is cancelled
//       programatically figure out the perfect buy price
const fiveDollarBuyStrategy = (state, tempData) => {
    let newState = Object.assign({}, state);
    let prevInfo = tempData[0];
    const BUY_DIFF = 5;
    tempData.forEach((info) => {
        if(Trade.stopLoss(newState, info.weightedAverage)) {
            Trade.sell(newState, info.weightedAverage);
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

module.exports = {
    fiveDollarBuyStrategy
};
