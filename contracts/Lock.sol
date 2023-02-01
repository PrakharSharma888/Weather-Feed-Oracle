// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract WeatherFeed {

    struct WeatherData {
        string temperature;
        string description;
    }

    event weather(string _location);

    mapping (string => WeatherData) public weatherData;

    function updateWeather(string memory _location, string memory _temperature, string memory _description) public {
        weatherData[_location].temperature = _temperature;
        weatherData[_location].description = _description;
    }

    function requestWeather(string memory _location) public returns(string memory) {
        emit weather(_location);
        return "Successfully requested Weather details for Your location!";
    }

    function getWeather(string memory _location) public view returns(string memory, string memory){
        WeatherData memory currentWeather = weatherData[_location];
        return (currentWeather.temperature, currentWeather.description);
    }
}


