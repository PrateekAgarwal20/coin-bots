let ACCOUNT_START = 0;
let STOP_LOSS_PERCENT = 0;
let RETURNS_PERCENT = 0;
const FEE = 0.0025;
let orderBook;

// Set all relevant variables
const setVariables = (_ACCOUNT_START, _STOP_LOSS_PERCENT, _RETURNS_PERCENT) => {
    ACCOUNT_START = _ACCOUNT_START;
    STOP_LOSS_PERCENT = _STOP_LOSS_PERCENT;
    RETURNS_PERCENT = _RETURNS_PERCENT;
    orderBook = [];
};

// Get buyOrders
const getOrders = () => {
    return orderBook;
};

// Buys stock given current account/portfolio state and price.
// TODO: update buyOrders
const buy = (state, price, _value) => {
    let value = _value || state.account;
    if(state.account < value) {
        value = state.account;
    }
    const fee = value * FEE;
    const amountBought = value / price;
    const postState = {
        account: state.account - value - fee,
        portfolio: {
            ETH: state.portfolio.ETH + amountBought
        }
    };
    orderBook.push({
        action: 'BUY',
        coin: 'ETH',
        price: price,
        amount: amountBought,
        value: value
    });
    return postState;
};

// Sells stock given current account/portfolio state and price.
// TODO: update sellOrders
const sell = (state, price, _amount) => {
    const amount = _amount || state.portfolio.ETH;
    if(amount > state.portfolio.ETH) {
        amount = state.portfolio.ETH;
    }
    const value = price * amount;
    const fee = value * FEE;
    const postState = {
        account: state.account + value - fee,
        portfolio: {
            ETH: state.portfolio.ETH - amount
        }
    };
    orderBook.push({
        action: 'SELL',
        coin: 'ETH',
        price: price,
        amount: amount,
        value: value
    });
    return postState;
};

// TODO: Test this: Sells all ETH if the current price is a ten percent loss or more
const stopLoss = (state, price) => {
    if(state.portfolio.ETH) {
        const value = state.portfolio.ETH * price;
        const moneySpent = ACCOUNT_START - state.account;
        const threshold = moneySpent * STOP_LOSS_PERCENT;
        // TODO: set actual threshold using buyOrders[0]
        // console.log('value: ', value, 'threshold: ', threshold);
        // console.log(state.account);
        return value < threshold;
    }
    return false;
};

// -----------------------------------------------------------------------------
// ----------------------Five Dollar Buy Functions------------------------------
// -----------------------------------------------------------------------------

// Returns true if there are enough returns.
const sufficientReturns = (state, price) => {
    const value = state.portfolio.ETH * price;
    const fee = value * FEE;
    const moneySpent = ACCOUNT_START - state.account;
    const threshold = moneySpent * RETURNS_PERCENT;
    // TODO: set actual threshold using buyOrders[0]
    return (value - fee) > threshold;
};

// -----------------------------------------------------------------------------
// --------------------------Candlestick Functions------------------------------
// -----------------------------------------------------------------------------

const isHammerOrShadow = (info) => {
    const range = info.high - info.low;
    const upperBound = range * 0.9 + info.low;
    const lowerBound = range * 0.1 + info.low;
    if(info.weightedAverage >= upperBound) {
        return 1;
    } else if(info.weightedAverage <= lowerBound) {
        return -1;
    }
    return 0;
};

module.exports = {
    setVariables,
    getOrders,
    buy,
    sell,
    stopLoss,
    sufficientReturns,
    isHammerOrShadow
};
