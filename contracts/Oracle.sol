// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Oracle is Ownable {

    struct WeatherData {
        string temperature;
        string description;
    }

    modifier onlyPayer{
        require(tx.origin == payer, "Not the payer!");
        _;
    }

    event weather(string _location);
    address public payer;

    mapping (string => WeatherData) public weatherData;

    function updateWeather(string memory _location, string memory _temperature, string memory _description) onlyOwner public {
        weatherData[_location].temperature = _temperature;
        weatherData[_location].description = _description;
    }

    function requestWeather(string memory _location) public onlyPayer returns(string memory) {
        emit weather(_location);
        return "Successfully requested Weather details for Your location!";
    }

    function payForWeatherData() public payable returns(bool){
        require(msg.value >= 1 ether, "Payment must be at least 1 ether");
        payer = payable(tx.origin);
        return true;
    }

    function getWeather(string memory _location) public onlyPayer view returns(string memory, string memory){
        WeatherData memory currentWeather = weatherData[_location];
        return (currentWeather.temperature, currentWeather.description);
    }
}


