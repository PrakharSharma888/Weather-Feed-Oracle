// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Oracle is Ownable {

    struct WeatherData {
        string temperature;
        string description;
    }

    mapping(address => mapping(string => bool)) public isPayer;

    event weather(string _location);

    mapping (string => WeatherData) public weatherData;

    function updateWeather(string memory _location, string memory _temperature, string memory _description) onlyOwner public {
        weatherData[_location].temperature = _temperature;
        weatherData[_location].description = _description;
    }

    function requestWeather(string memory _location) payable public returns(string memory) {
        if(!isPayer[tx.origin][_location]){
            require(msg.value >= 1 ether,"oracle : not a payer");
            isPayer[tx.origin][_location] = true;
        }
        emit weather(_location);
        return "Successfully requested Weather details for Your location!";
    }

    function getWeather(string memory _location) public view returns(string memory, string memory){
        WeatherData memory currentWeather = weatherData[_location];
        return (currentWeather.temperature, currentWeather.description);
    }
}


