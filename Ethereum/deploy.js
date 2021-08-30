const compiledCode=require('./build/FileContract.json')
const Web3=require('web3')
const HDWalletProvider=require('@truffle/hdwallet-provider');
const mnemonicPhrase = "drift virus toss perfect wheel stove tiger sustain barrel school cake object";
let provider = new HDWalletProvider(mnemonicPhrase, "https://rinkeby.infura.io/v3/c418d4eba8b84ff092648af21a3e7e6f");

const web3=new Web3(provider);

const deploy=async()=>{
   const accounts=await web3.eth.getAccounts();
   
   const interfaces=new web3.eth.Contract(compiledCode.abi);

   const output= await interfaces.deploy({data:compiledCode.evm.bytecode.object}).send({
        from:accounts[0],
        gas:'1000000'
   }) 
   //0xf038b5085e4Ac3c5b36a2cA9497Bd84a0B0A250E
   console.log(output.options.address)
}

deploy();