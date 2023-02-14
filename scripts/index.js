const { Contract, ethers } = require('ethers');
const axios = require('axios');
const { userAbi, oracleAbi } = require("../constrants/index.js")

async function getWeatherData(){

    const userContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
    const oracleContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    const signer = provider.getSigner()
    const userContract = new Contract(userContractAddress, userAbi, signer)
    const oracleContract = new Contract(oracleContractAddress, oracleAbi, signer)

    const weatherRequest = await userContract.requestWeatherData("mumbai",{value:ethers.utils.parseEther("2"), gasLimit : 300000})
    const data = await userContract.getData()

    const location = data;
    console.log(location)
    // const location = getDataRecipt.events[0].args._location;
    // console.log(location)

    var [temp, des] = await getWeatherDataOffChain(location)
    temp = temp.toString()
    // console.log(temp, des)
    const updateData = await oracleContract.updateWeather(location, temp, des)
    const finalData = await userContract.retreiveWeather(location)
    console.log(finalData)


}

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
getWeatherData()
