const Data = require('./dataFunctions.js');
const Trade = require('./tradingFunctions.js');
const Strategy = require('./strategies.js');
const ACCOUNT_START = 100;
let PERCENT = 1;

const main = () => {
    // data.forEach((info) => {
    // // IDEA: Add the main strategy script here, what you want to test and stuff
    // // var shouldBuy = strategy(account, portfolio)
    // });
    const data = Data.data;
    const percentArr = [];
    const valueArr = [];
    // TODO: fix fees
    for(let i = 0; i < 150; i++) {
        PERCENT = 1 + (i / 100);
        Trade.setVariables(ACCOUNT_START, PERCENT);
        const state = {
            account: ACCOUNT_START,
            portfolio: {ETH: 0}
        };

        const newState = Strategy.fiveDollarBuyStrategy(state, data);
        let value = newState.account;
        // Convert to dollars if all assets are in ETH at end
        if(newState.portfolio.ETH) {
            value = newState.portfolio.ETH * data[data.length - 1].weightedAverage;
        }

        percentArr.push(PERCENT);
        valueArr.push(value);
    }

    // percentArr.forEach((percent) => {
    //     console.log(percent.toString().slice(0, 4));
    // });
    // console.log('YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    // valueArr.forEach((value) => {
    //     console.log(value);
    // });
    const max1 = {val: 0, percent: 0};
    const max2 = {val: 0, percent: 0};
    const max3 = {val: 0, percent: 0};
    valueArr.forEach((val, index) => {
        if(val < max2.val && val >= max3.val) {
            max3.val = val;
            max3.percent = percentArr[index];
        }
        if(val < max1.val && val >= max2.val) {
            max2.val = val;
            max2.percent = percentArr[index];
        }
        if(val >= max1.val) {
            max1.val = val;
            max2.percent = percentArr[index];
        }
    });
    console.log(max1.percent, max1.val);
    console.log(max2.percent, max1.val);
    console.log(max3.percent, max1.val);
    // console.log('ACCOUNT: ', newState.account, 'PORTFOLIO: ', newState.portfolio);
};

main();
