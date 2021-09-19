const {expect} = require("chai");


describe("Lottery Contract", function() {

	let Lottery;
	let contract;
	let player;

	beforeEach(async function() {
		Lottery = await ethers.getContractFactory("Lottery");
		contract = await Lottery.deploy();
		[player] = await ethers.getSigners();
	})

	describe("Should deploy correctly", function() {
		it("should have correct initial balances", async function() {

			expect(await contract.initialSupply()).to.equal("900");
			expect(await contract.returnBalance()).to.equal("100");
		});
	});

})






