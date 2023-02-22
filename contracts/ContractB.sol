// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface Oracle {
     function requestWeather(string memory _location) payable external returns(string memory) ;
     function getWeather(string memory _location) view external returns(string memory, string memory);
}

contract Contract2 {
    address oracleAddress;
    bool payment;

    constructor(address _c1)  {
       oracleAddress = _c1;
    }

    string location;

    function requestWeatherData(string memory _location) public payable returns (string memory){
        string memory message = Oracle(oracleAddress).requestWeather{value:msg.value}(_location);
        return message;
    }

    function retreiveWeather(string memory _location) public view returns(string memory, string memory){
        return Oracle(oracleAddress).getWeather(_location);
    }
}