let ACCOUNT_START = 0;
let PERCENT = 0;
const FEE = 0.0025;
let buyOrders = [];

// Set all relevant variables
const setVariables = (_ACCOUNT_START, _PERCENT) => {
    ACCOUNT_START = _ACCOUNT_START;
    PERCENT = _PERCENT;
};

// Get buyOrders
const getBuyOrders = () => {
    return buyOrders;
};

// Set buyOrders
const setBuyOrders = (_buyOrders) => {
    buyOrders = _buyOrders;
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
        // account: state.account - value,
        portfolio: {
            ETH: state.portfolio.ETH + amountBought
        }
    };
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
        // account: state.account + value,
        portfolio: {
            ETH: state.portfolio.ETH - amount
        }
    };
    return postState;
};

// TODO: Sells all ETH if the current price is a ten percent loss or more
const stopLoss = (state, price) => {
    if(state.portfolio.ETH) {
        const value = state.portfolio.ETH * price;
        const moneySpent = ACCOUNT_START - state.account;
        const threshold = moneySpent * (1 - (PERCENT - 1));
        // TODO: set actual threshold using buyOrders[0]
        return value <= threshold;
    }
    return false;
};

// Returns true if there are enough returns.
const sufficientReturns = (state, price) => {
    const value = state.portfolio.ETH * price;
    const fee = value * FEE;
    const moneySpent = ACCOUNT_START - state.account;
    const threshold = moneySpent * PERCENT;
    // TODO: set actual threshold using buyOrders[0]
    return (value - fee) > threshold;
};


module.exports = {
    setVariables,
    getBuyOrders,
    setBuyOrders,
    buy,
    sell,
    stopLoss,
    sufficientReturns
};
