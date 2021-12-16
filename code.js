var address = "0xF08973Cb4Fa457Eb0D1E531A0b85B225E7A6BB26"
var abi = [
  {
    "inputs": [],
    "name": "player1",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "player2",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Be_First_Player",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Be_Second_Player",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "moves",
        "type": "int256"
      }
    ],
    "name": "Skaicius",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Nugaletojas",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBoard",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "checkJackpot",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
var contract;
var accounts;
$(document).ready(function ()
{
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    contract = new web3.eth.Contract(abi, address);

    contract.methods.getBoard().call().then(function(Score)
    {
        $('#Score').html(Score);
    })
    contract.methods.checkJackpot().call().then(function(balance)
    {
        $('#jackpot').html(balance);
    })
    web3.eth.getAccounts().then(function(accounts1){
        accounts = accounts1;
    })
});

setInterval(()=>    contract.methods.getBoard().call().then(function(Score)
{
    $('#Score').html(Score);
}), 5000);

$('#FirstPlayer').click(function(){
    contract.methods.Be_First_Player().send({ from: accounts[0], value: 1000000000000000000 });
})
$('#SecondPlayer').click(function(){
  contract.methods.Be_Second_Player().send({ from: accounts[0], value: 1000000000000000000 });
})
$('#Move').click(function(){
  try{contract.methods.Skaicius(String($('#amount').val())).send({ from: accounts[0]});}
  catch(y){
    console.log(y);
  }
})