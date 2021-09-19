import React, {useEffect, useState} from 'react';


const { ethers} = require("ethers");

// PUT YOUR PRIVATE KEY IN A .ENV FILE
const PRIVATE_KEY = "YOUR PRIVATE KEY" //You should add it in a .env file for security reasons

//This is the address of the contract that you deployed
// Actually, you can interact with every contract
const lotteryAddress = "THE ADDRESS OF THE CONTRACT";

//Here is the Application Binary Interface, the methods to interact with
// the contract. You do not need to put all, just the ones you are going to interact with
// You need to add them inside of an array
const lotteryABI = [
  "function returnBalance() public view returns(uint)",
  "function bet(uint guess) public returns(string memory)"
];

// Here is the provider with the api that you got from alchemy
const provider = new ethers.providers.JsonRpcProvider("API FROM YOUR PROVIDER --> ALCHEMY");

//The signer has permission to sign transactions
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Here is how you interact with the contract, adding the 3 params.
const lotteryContract = new ethers.Contract(lotteryAddress, lotteryABI, provider);

// contract with signer for state changing mthods
const contractSigner = lotteryContract.connect(signer);


export default function App() {

  const [balance, setBalance] = useState("");

  useEffect(() => {
    lotteryContract.returnBalance()
                                  .then(res => setBalance(res.toNumber()))
                                  .catch(err => console.log(err));
  })

  function handleChange() {
    contractSigner.bet(100) // WHATEVER NUMBER YOU WANT, THIS IS THE BET FUNCTION
  }

  return (
    <div>
      <h2> PLACE YOUR BETS!</h2>
        <button onClick={handleChange}>
         BET
        </button>
      <h4>Player balance is --> {balance}</h4>
    </div>

    );
}
