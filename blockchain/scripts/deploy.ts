import { ethers } from "hardhat";

const main = async () => {
  const Contract = await ethers.getContractFactory("OpenMint");
  const deployedContract = await Contract.deploy();
  await deployedContract.waitForDeployment();

  console.log("Contract Address: ", deployedContract.target);
};

main()
  .then(() => {
    console.log("Deployment completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
