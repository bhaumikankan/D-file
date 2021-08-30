const fs=require('fs-extra');
const path =require('path');
const solc=require('solc');

fs.removeSync(path.resolve(__dirname,"build"));
const contractPath=path.resolve(__dirname,"Contracts","FileContract.sol")
const contract=fs.readFileSync(contractPath, {encoding: 'utf8'})
fs.ensureDirSync(path.resolve(__dirname,"build"));


var input = {
    language: 'Solidity',
    sources: {
      'File.sol': {
        content: contract
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

  var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['File.sol']
//console.log(output.contracts['File.sol']);

for(var contractName in output) {
     fs.outputJSONSync(path.join(__dirname,"build",`${contractName}.json`),output[contractName])
}

