const { Contract, ethers } = require('ethers');
const axios = require('axios');

async function getWeatherData(){

    const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

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
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
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
            "internalType": "uint256",
            "name": "_temperature",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "_humidity",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "_windSpeed",
            "type": "uint256"
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
            "internalType": "uint256",
            "name": "temperature",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "humidity",
            "type": "uint256"
            },
            {
            "internalType": "uint256",
            "name": "windSpeed",
            "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        }
    ]

    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    const signer = provider.getSigner()
    const contract = new Contract(ContractAddress, abi, signer)

    const getData = await contract.getWeather("delhi")
    const getDataRecipt = await getData.wait()

    const location = getDataRecipt.events[0].args._location;
    console.log(location)

    console.log(getWeatherDataOffChain(location))

}

async function getWeatherDataOffChain(locations){
    const params = {
        access_key: 'bbca4a5fddad688e0cfd6b59612e8c6c',
        query: 'New York'
      }
      
      axios.get('https://api.weatherstack.com/current', {params})
        .then(response => {
          const apiResponse = response.data;
          console.log(apiResponse);
        }).catch(error => {
          console.log(error);
        });
}
getWeatherData()
