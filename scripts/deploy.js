
const hre = require("hardhat");

async function main() {

  const weatherFeed = await hre.ethers.getContractFactory("WeatherFeed");
  const _weatherFeed = await weatherFeed.deploy();

  await _weatherFeed.deployed();
  console.log(_weatherFeed.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
