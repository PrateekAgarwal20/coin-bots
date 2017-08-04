// const Client = require('coinbase').Client;

// const client = new Client({ apiKey: process.env.CB_API_KEY,
//   apiSecret: process.env.CB_API_SECRET,
// });

const data = require('./data.js');

// Takes in state and adds a new object if either the buy or sell price
// is different than the latest one
const addData = function(log) {
    data.getInfoCB()
    .then((resp) => {
        const latestEntry = {};
        if(log.length > 0) {
            log[log.length - 1];
        }
        if(latestEntry.buyPrice !== resp.buyPrice ||
          latestEntry.sellPrice !== resp.sellPrice) {
            log.push(resp);
        }
        return log;
    });
};

export default addData;

// CALCULATES AS A TIMER
// const LIMIT = 10;
// let i = 0;
// const intervalId = setInterval(() => {
//   i += 1;
//   if (i > LIMIT) {
//     clearInterval(intervalId);
//   }
//   const arr = data.getInfoCB().then(resp => console.log(resp));
//   if (Array.isArray(arr)) {
//     console.log(arr);
//   }
// }, 1000);
