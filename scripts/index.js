
const ethers = require('ethers');
const axios = require('axios');

const { abi } = require('../constrants/index.js');
const provider = new ethers.providers.JsonRpcProvider(
  'https://api.baobab.klaytn.net:8651/'
);
const contractAddress = '0x7F9900Bba36636fcc462944a6e9B3848FD012a10';
const privateKey =
  '884ae64d8fc43f49a0c9fbce02f9eabdabfe21cdbe8e9cddb018d2d8016076d0';
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

const oracleFunction = async () => {
 contract.on('weather', async (_loaction) => {
    console.log('--details--', _loaction);
    const location = _loaction;
    console.log(location);
      try {
        [temp,des] = await getWeatherDataOffChain(location)
        console.log(temp, des);
        temp = temp.toString()
      } catch (e) {
        console.error(e);
    }

    const updateData = await contract.updateWeather(location, temp, des)
    console.log(updateData);

  });

};
console.log("Started");
oracleFunction();

async function getWeatherDataOffChain(location){
    try {
        const apiKey = 'c6b644a9f69f2b39e4bbf0178303d637';
        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
        const response = await axios.get(weatherAPI);
        const weatherData = response.data;
        // console.log(`Current weather in ${location}:`);
        // console.log(`Temperature: ${weatherData.main.temp}°F`);
        // console.log(`Description: ${weatherData.weather[0].description}`);
        return [weatherData.main.temp, weatherData.weather[0].description]
      } catch (error) {
        console.error(error);
      }
}
