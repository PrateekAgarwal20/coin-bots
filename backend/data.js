const Promise = require('es6-promise').Promise;
const axios = require('axios');

const buyPriceCB = () => axios.get('https://api.coinbase.com/v2/prices/ETH-USD/buy');

const sellPriceCB = () => axios.get('https://api.coinbase.com/v2/prices/ETH-USD/sell');

const timeCB = () => axios.get('https://api.coinbase.com/v2/time');

async function getInfoCB() {
    const [buyPrice, sellPrice, time] = await Promise.all([buyPriceCB(), sellPriceCB(), timeCB()]);
    return {'buyPrice': buyPrice.data.data, 'sellPrice': sellPrice.data.data, 'time': time.data.data.iso};
}


module.exports = {
    getInfoCB,
};
