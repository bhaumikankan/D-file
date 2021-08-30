import Web3 from 'web3';

let web3;

if(typeof window!=='undefined' && typeof window.web3!=='undefined'){
    web3 = new Web3(window.web3.currentProvider);
}
else{
    web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/c418d4eba8b84ff092648af21a3e7e6f'));
}

export default web3;