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
var fs = require('fs')

var data = JSON.parse(fs.readFileSync('./historical_USDT_ETH.txt'));

var account = {
  USDT: 100
}
var portfolio = {}


const main = () => {
  data.forEach((info) => {
    // IDEA: Add the main strategy script here, what you want to test and stuff
    // var shouldBuy = strategy(account, portfolio)
  })

}

/*
  Should be able to carry out these functions:
  Buy - buy at the closest one
  Sell - sell at the closest one
  

  Helper functions
  Get price - returns price given a valid (in register) UNIX date

*/



main()
