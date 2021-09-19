async function main() {

	const [deployer] = await ethers.getSigners();
	console.log("Deploying the contract with the account -->", deployer.address);
	console.log("The balance of the account is -->", (await deployer.getBalance()).toString());

	const Lottery = await ethers.getContractFactory("Lottery");

	const contract = await Lottery.deploy();
	console.log("Contract address -->", contract.address);
}



main()
	.then(() => process.exit(1))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})







	