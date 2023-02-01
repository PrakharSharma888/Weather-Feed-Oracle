const { Contract, ethers } = require('ethers');
const axios = require('axios');

async function getWeatherData(){

    const ContractAddress = "0x998abeb3E57409262aE5b751f60747921B33613E"

    const abi = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "_location",
              "type": "string"
            }
          ],
          "name": "weather",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_location",
              "type": "string"
            }
          ],
          "name": "getWeather",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_location",
              "type": "string"
            }
          ],
          "name": "requestWeather",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_location",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_temperature",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_description",
              "type": "string"
            }
          ],
          "name": "updateWeather",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "weatherData",
          "outputs": [
            {
              "internalType": "string",
              "name": "temperature",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]

    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    const signer = provider.getSigner()
    const contract = new Contract(ContractAddress, abi, signer)

    const getData = await contract.requestWeather("mumbai")
    const getDataRecipt = await getData.wait()

    const location = getDataRecipt.events[0].args._location;
    // console.log(location)

    var [temp, des ] = await getWeatherDataOffChain(location)
    temp = temp.toString()
    // console.log(temp, des)
    const updateData = await contract.updateWeather(location, temp, des)
    const finalData = await contract.getWeather(location)
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
