// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./Oracle.sol";

contract Contract2 {
    Oracle c1;
    bool payment;

    constructor(address _c1) public {
        c1 = Oracle(_c1);
    }

    string location;

    function requestWeatherData(string memory _location) public payable returns (string memory, bool){
        (bool success) = c1.payForWeatherData{value:msg.value}();

        location = _location;
        string memory successfull = c1.requestWeather(_location);
        return (successfull, success);
    }

    function getData() public view returns(string memory){
        return(location);
    }

    function retreiveWeather(string memory _location) public view returns(string memory, string memory){
        return c1.getWeather(_location);
    }
}