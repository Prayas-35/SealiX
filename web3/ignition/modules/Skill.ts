import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import hre from "hardhat";

async function main() {
    console.log("Deploying SkillBadge contract...");

    // Get the contract factory
    const SkillBadge = await ethers.getContractFactory("SkillBadge");

    // Deploy the contract
    const skillBadge = await SkillBadge.deploy();

    // Wait for the deployment to be confirmed
    const tx = skillBadge.deploymentTransaction();
    if (!tx) throw new Error("Deployment transaction failed");
    await tx.wait();

    console.log(`SkillBadge deployed to: ${skillBadge.target}`);

    // Verify the contract on Etherscan if not on a local network
    const networkName = hre.network.name;
    if (networkName !== "localhost" && networkName !== "hardhat") {
        console.log("Waiting for block confirmations...");

        // Wait for 6 block confirmations before verification
        const deployTx = skillBadge.deploymentTransaction();
        if (!deployTx) throw new Error("Deployment transaction not found");
        await deployTx.wait(6);

        console.log("Verifying contract on Etherscan...");

        try {
            await hre.run("verify:verify", {
                address: skillBadge.target,
                constructorArguments: [],
            });
            console.log("Contract verified on Etherscan");
        } catch (error) {
            console.error("Error verifying contract:", error);
        }
    }

    return skillBadge;
}

// Execute the deployment
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Deployment failed:", error);
        process.exit(1);
    });