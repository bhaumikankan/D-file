import web3 from './web3'
import compiledCode from './Ethereum/build/FileContract.json'
//0x85Ee842b9Ddd9d9F5Bb39E984a2bF39f3a8cAd75
//old-0xe2d7aaf9896cE10b7b0d04C1f7185310724fD0Ea
const address='0x85Ee842b9Ddd9d9F5Bb39E984a2bF39f3a8cAd75'

export default (new web3.eth.Contract(compiledCode.abi,address));