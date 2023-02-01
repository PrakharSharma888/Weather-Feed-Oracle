// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract WeatherFeed {

    struct WeatherData {
        uint256 temperature;
        uint256 humidity;
        uint256 windSpeed;
    }

    event weather(string _location);

    mapping (string => WeatherData) public weatherData;

    function updateWeather(string memory _location, uint256 _temperature, uint256 _humidity, uint256 _windSpeed) public {
        weatherData[_location].temperature = _temperature;
        weatherData[_location].humidity = _humidity;
        weatherData[_location].windSpeed = _windSpeed;
    }

    function getWeather(string memory _location) public returns(uint256, uint256, uint256) {
 
        emit weather(_location);
        WeatherData memory currentWeather = weatherData[_location];
        return (currentWeather.temperature, currentWeather.humidity, currentWeather.windSpeed);
        
    }
}


