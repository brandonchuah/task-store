const { ethers } = require("hardhat");

const POKEME_ADDRESS = hre.network.config.POKEME_ADDRESS;
const COUNTER_ADDRESS = process.env.npm_config_counter;

async function main() {
  [user] = await hre.ethers.getSigners();
  userAddress = await user.getAddress();
  console.log("Submitting Task: ");

  console.log(COUNTER_ADDRESS);
  const pokeme = await ethers.getContractAt("PokeMe", POKEME_ADDRESS, user);
  const counter = await ethers.getContractAt("Counter", COUNTER_ADDRESS, user);

  const taskData = await counter.interface.encodeFunctionData("increaseCount", [
    1,
  ]);

  const txn = await pokeme.createTask(counter.address, taskData, {
    gasLimit: 1000000,
    gasPrice: ethers.utils.parseUnits("2", "gwei"),
  });

  const res = await txn.wait();
  console.log(res);

  console.log("Task Submitted");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
