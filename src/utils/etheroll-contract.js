import getWeb3 from './get-web3';
import etherollAbi from './etheroll-abi';

// TODO: per network contrat address
const contractAddress = '0xe12c6dEb59f37011d2D9FdeC77A6f1A8f3B8B1e8';

function getEtherollContractSync(web3) {
    return web3.eth.contract(etherollAbi).at(contractAddress);
}

function getEtherollContract() {
  return getWeb3.then(results => {
    var web3 = results.web3;
    return getEtherollContractSync(web3);
  }).catch(function(error) {
    console.log(error);
    console.log('Error finding web3.')
  });
}


export {getEtherollContract, getEtherollContractSync};
