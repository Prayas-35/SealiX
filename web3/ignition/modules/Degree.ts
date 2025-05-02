// deploy.js
import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import hre from "hardhat";

async function main() {
    console.log("Deploying UniversityDegreeSBT contract...");

    // Get the contract factory
    const UniversityDegreeSBT = await ethers.getContractFactory("UniversityDegreeSBT");

    // Deploy the contract
    const universityDegreeSBT = await UniversityDegreeSBT.deploy();

    // Wait for the deployment to be confirmed
    const deployTransaction = universityDegreeSBT.deploymentTransaction();
    if (!deployTransaction) throw new Error("Deployment transaction failed");
    await deployTransaction.wait();

    console.log(`UniversityDegreeSBT deployed to: ${universityDegreeSBT.target}`);

    // Verify the contract on Etherscan if not on a local network
    const networkName = hre.network.name;
    if (networkName !== "localhost" && networkName !== "hardhat") {
        console.log("Waiting for block confirmations...");

        // Wait for 6 block confirmations before verification
        const tx = universityDegreeSBT.deploymentTransaction();
        if (!tx) throw new Error("Deployment transaction not found");
        await tx.wait(6);

        console.log("Verifying contract on Etherscan...");

        try {
            await hre.run("verify:verify", {
                address: universityDegreeSBT.target,
                constructorArguments: [],
            });
            console.log("Contract verified on Etherscan");
        } catch (error) {
            console.error("Error verifying contract:", error);
        }
    }

    return universityDegreeSBT;
}

// Execute the deployment
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Deployment failed:", error);
        process.exit(1);
    });