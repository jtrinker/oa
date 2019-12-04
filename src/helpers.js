// API INFO
const ROOT = 'https://api.worldtradingdata.com/api/v1/stock?symbol=';
const TOKEN = '=z5IhiYKbAvjvwC05hl1759smWFH5tHMw5HobVE72IRV5d0hlg3863Ygzym5G';

export const buildEndpoint = (tickerArray) => {
    let symbolString = '';
    tickerArray.forEach((value, index) => {
        if (index === tickerArray.length - 1) {
            symbolString = `${symbolString}${tickerArray[index]}`;
        } else {
            symbolString = `${symbolString}${tickerArray[index]},`;
        }
    });
    
    let endPoint = ROOT + symbolString + '?api_token' + TOKEN;
    return endPoint;
};
  