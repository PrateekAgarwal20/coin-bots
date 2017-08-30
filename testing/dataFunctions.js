/*
  {
    date: 1483228800,
    high: 8.555,
    low: 8.04482173,
    open: 8.04482173,
    close: 8.52804175,
    volume: 61502.36821553,
    quoteVolume: 7291.95062299,
    weightedAverage: 8.43428204
  }
*/

// TODO: make a function that returns time in different critical chunks for
//       proper testing. It should also return the how the market performed
//       (percent wise) so that it can be used to compare to the strategy
//       that is employed

const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./historical_USDT_ETH.txt'));

// Gets data from a given start to a given end date
const getDataRange = (startDate, endDate) => {
    let startIndex = 0;
    let endIndex = 0;
    data.forEach((info, index) => {
        if(Math.abs(info.date - startDate) < 100) {
            startIndex = index;
        }
        if(Math.abs(info.date - endDate) < 300) {
            endIndex = index;
        }
    });
    return data.slice(startIndex, endIndex + 1);
};

// Gets data around a given date. 86400 seconds before to 86400 seconds after
// 86400 is the number of seconds per day
const getDataRangeAround = (initDate, rnge) => {
    // NOTE: Dates are 0 indexed. (year, month, day, hour, minute, second)
    // This date was chosen because of the boom around this time frame
    let date = new Date(2017, 6, 17, 15);
    date = date.getTime() / 1000;

    const centerDate = initDate || date;

    const range = rnge || 86400;
    return getDataRange(centerDate - range, centerDate + range);
};

// Logs the given data
const logData = (tempData) => {
    for(let i = 0; i < tempData.length; i++) {
        console.log('DATE: ', tempData[i].date.toString());
        console.log('PRICE: ', tempData[i].weightedAverage);
        console.log('===================================');
    }
};

// Logs new state
const logState = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        console.log('FIRST: ', arr[i].first.weightedAverage);
        console.log('     Time: ', (new Date(arr[i].first.date * 1000)).toString());
        console.log('SECOND: ', arr[i].second.weightedAverage);
        console.log('     Time: ', (new Date(arr[i].second.date * 1000)).toString());
        console.log('===================================');
    }
};

module.exports = {
    data,
    getDataRange,
    getDataRangeAround,
    logData,
    logState
};
